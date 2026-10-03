import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type : String,
            reqired: true,
            trim: true
        },

        email :{
            type : String,
            required : true,
            unique : true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        phone:{
            type : String,
            trim: true
        },

        role:{
            type : String,
            enum: ["customer", "shopOwner"],
            default: "customer"
        },

        avatar:{
            url :{
                type: String
            },
            publicId: {
                type: String
            }
        },

        favouriteBarber:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Barber"
            }
        ]
    },
    {
        timestamps: true
    }
);


const User = mongoose.model("User", userSchema);

export default User;
