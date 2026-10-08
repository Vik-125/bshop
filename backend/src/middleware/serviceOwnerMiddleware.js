// Here we are finding the shop from the serviceId provided in the request.
// For updating the service.

import Service from "../models/Service.js";
import Barbershop from "../models/Barbershop.js";

const serviceOwnerMiddleware = async (req, res, next) => {
    try{
        const service = await Service.findById(req.params.serviceId);

        if(!service){
            return res.status(404).json({
                message: "Service not found"
            });
        }

        const shop = await Barbershop.findById(service.shop);

        if(!shop){
            return res.status(404).json({
                message: "Barbershop not found"
            });
        }

        if(shop.owner.toString() !== req.user.userId){
            return res.status(403).json({
                message: "You do not own this service"
            });
        }

        req.service = service;
        req.shop = shop;

        next();
    } catch(error){
        res.status(500).json({
            message:"Server error",
            error : error.message
        });
    }
};


export default serviceOwnerMiddleware;