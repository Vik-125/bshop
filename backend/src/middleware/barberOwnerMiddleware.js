import Barber from "../models/Barber.js";
import Barbershop from "../models/Barbershop.js"

const barberOwnerMiddleware = async (req, res, next) => {
    try{
        const barber = await Barber.findById(req.params.barberId);

        if(!barber){
            return res.status(404).json({
                message: "Barber not found"
            });
        }

        const shop = await Barbershop.findById(barber.shop);

        if(!shop){
            return res.status(404).json({
                message: "Barbershop not found"
            });
        }

        if(shop.owner.toString() !== req.user.userId){
            return res.status(403).json({
                message: "You do not own this barber"
            })
        }

        req.barber = barber;
        req.shop = shop;

        next();
    } catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


export default barberOwnerMiddleware;