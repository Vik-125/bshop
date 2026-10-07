import Service from "../models/Service.js";

export const createService = async (req, res) => {
    try{
        const { name, description, price, duration } = req.body;

        if(!name || price === undefined || duration == undefined){
            return res.status(400).json({
                message: "Name, price and duration are required"
            });
        }

        const existingService = await Service.findOne({
            shop: req.shop._id,
            name: name.trim()
        });

        if(existingService) {
            return res.status(409).json({
                message: "Service already exists in the shop"
            });
        }

        const service = await Service.create({
            shop: req.shop._id,
            name: name.trim(),
            description,
            price,
            duration
        });

        res.status(201).json({
            message: "Service created successfully",
            service
        });
    }
    catch(error){
        res.staus(500).json({
            message: "Server error",
            error: error.message
        })
    }
};
