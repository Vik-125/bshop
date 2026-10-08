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


export const getShopServices = async (req, res) => {
    try{
        const services = await Service.find({
            shop : req.params.shopId,
            isActive: true
        })

        res.status(200).json({
            services
        })

    } catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
};

// For updating the service
export const updateService = async(req, res) => {
    try{
        const { name, description, price, duration } = req.body;

        const service = req.service;

        if(name !== undefined){
            service.name = name.trim();
        }

        if(description !== undefined){
            service.description = description;
        }

        if(price !== undefined){
            service.price = price;
        }

        if(duration !== undefined){
            service.duration = duration;
        }

        await service.save();

        res.status(200).json({
            message: "Service updated successfully",
            service
        });

    } catch(error){
        res.status(500).json({
            message: "Server error",
            error : error.message
        })
    }
}


// Deactivating Service

export const deactivateService = async(req, res) => {
    try{
        const service = req.service;

        service.isActive = false;

        await service.save();

        res.status(200).json({
            message: "Service deactivated successfully",
            service
        });
    } catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


export const activateService = async(req, res) => {
    try{
        const service = req.service;

        service.isActive = true;

        await service.save();

        res.status(200).json({
            message: "Service activated successfully",
            service
        });
    } catch(error){
        res.status(500).json({
            message: "Server error",
            error : error.message
        });
    }
};