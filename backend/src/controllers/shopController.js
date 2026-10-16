import Barbershop from "../models/Barbershop.js";

// For creating a barbershop
export const createShop = async(req, res) =>{
    try {
        const{ name, description, address, phone } = req.body;

        if(!name || !address){
            return res.status(400).json({
                message: "Shop name & address are required"
            });
        }

        const existingShop = await Barbershop.findOne({
            owner: req.user.userId,
            name: name.trim(),
            address: address.trim()
        });

        if(existingShop){
            return res.status(409).json({
                message: "Shop already exists"
            })
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


// for retrieving a shop
export const getShopId = async (req, res)=>{
    try{
        const shop = await Barbershop.findById(req.params.shopId)
        .populate("owner", "name email phone");
        if(!shop){
            return res.status(404).json({
                message : "Barber shop not found"
            });
        }

        return res.status(200).json({
            shop
        })
    } catch(error){
        res.status(500).json({
            message: "Server error",
            error:  error.message
        });
    }
}

// For updating a shop info.
export const updateShop = async(req, res)=>{
    try{
        const { name, description, address, phone }= req.body;

        const shop = await Barbershop.findById(req.params.shopId);

        if (!shop) {
            return res.status(404).json({ message: "Barbershop not found" });
        }
        
        if(name !== undefined){
            shop.name = name;
        }

        if (description !== undefined) {
            shop.description = description;
        }

        if (address !== undefined) {
            shop.address = address;
        }

        if (phone !== undefined) {
            shop.phone = phone;
        } 

        await shop.save();
         
        res.status(200).json({
            message: "Barbershop updated successfully",
            shop
        });
    } catch(error){
        return res.status(500).json({
            message: "Server error",
            error : error.message
        });
    }
}

// for fetching all the barbers related to a paticular owner.
export const getMyShops = async(req, res) => {
    try{
        const shops = await Barbershop.find({
            owner : req.user.userId
        });
        return res.status(200).json({
            count: shops.length,
            shops
        });
    } catch(error){
        return res.status(500).json({
            message : "Failed to fetch your shops",
            error: error.message
        });
    }
}