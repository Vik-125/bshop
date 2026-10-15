import bycrpt from "bcrypt";
import User from  "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Registration of the user
const registerUser = async(req, res) => {
    try{
        const {name, email, password, phone, role } = req.body;
        
        if(!name || !email || !password || !role){
            return res.status(400).json({
                message: "Name , email, password & role are required!!"
            });
        }

        if(!["customer", "shopOwner"].includes(role)){
            return res.status(400).json({
                message :  "Invalid role"
            });
        }

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }

        const hashedPassword = await bycrpt.hash(password, 10);

        const user = await User.create({
            name, 
            email,
            password : hashedPassword,
            phone,
            role
        });

        res.status(201).json({
            message : "User registered successfully",

            user : {
                id : user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
};


// Authentication of the user

const loginUser = async(req, res) => {
    try{
        const{ email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "Email & password are required"
            })
        }

        const user = await User.findOne({ email });

        if(!user){
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bycrpt.compare(
            password,
            user.password
        );

        if(!isPasswordCorrect){
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user._id, user.role);

        res.status(200).json({
            message: "Login successful",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}


export { registerUser };
export { loginUser };