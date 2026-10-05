import Barbershop from "../models/Barbershop.js";

// It will be used for checking the authority of the user on a shop.  i.e. do you own the shop.
const shopOwnerMiddleware = async(req, res, next)=>{
    try{
        const shop = await Barbershop.findById(req.params.shopId);

        if(!shop){
            return res.status(404).json({
                message : "Shop doesn't exists!"
            });
        }

        // for checking is the user requesting service is real owner of the shop.
        if(shop.owner.toString() != req.user.userId){
            return res.status(403).json({
                message: "You do not own this Shop"
            });
        }

        req.shop = shop;

        next();
    } catch(error){
        res.status(500).json({
            message: "Server error",
            error : error.message
        });
    }
};


export default shopOwnerMiddleware;

