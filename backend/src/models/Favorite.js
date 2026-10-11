import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        barber: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Barber",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);


favoriteSchema.index(
    {customer: 1, barber: 1},
    {unique: true}
);

const Favorite = mongoose.model("Favourite", favoriteSchema);

export default Favorite;