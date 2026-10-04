import Barbershop from "../models/Barbershop.js";

export const createShop = async(req, res) =>{
    try {
        const{ name, description, address, phone } = req.body;

        if(!name || !address){
            return res.status(400).json({
                message: "Shop name & address are required"
            });
        }

        const existingShop = await Barbershop.findOne({
            owner : req.user.userId
        })

        if(existingShop){
            return res.status(409).json({
                message: "You already have a barbershop"
            });
        }

        const shop = await Barbershop.create({
            owner: req.user.userId,
            name,
            description,
            address,
            phone
        });

        res.status(201).json({
            message: "Barbershop created successfully",
            shop
        });
    } catch(error){
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};