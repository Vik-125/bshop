// For creating & adding barbers to shpos.

import Barber from "../models/Barber.js";


export const createBarber = async (req, res) => {
    try{
        const{ name, bio, experience, specialization, workingHours } = req.body;

        if(!name){
            return res.status(400).json({
                message : "Barber name is required"
            })
        }

        const existingBarber = await Barber.findOne({
            shop: req.shop._id,
            name: name.trim()
        })

        if(existingBarber){
            return res.status(409).json({
                message: "Barber already exists in this shop!!"
            })
        }

        const barber = await Barber.create({
            shop: req.shop._id,
            name,
            bio,
            experience,
            specialization,
            workingHours
        });

        res.status(201).json({
            message: "Barber created successfully",
            barber
        })
    } catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}