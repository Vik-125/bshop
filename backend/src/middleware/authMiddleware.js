// for authentication the user.

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try{
        // Authorization:  Bearer eyrbosbe...(token)
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message : "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        // if the token is correct then decoded have the information which is used while the time of token formation, i.e userId & role here.
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch(error){
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}


export default authMiddleware;