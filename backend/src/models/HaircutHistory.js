import mongoose from "mongoose";

const haircutHistorySchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        barber: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Barber",
            required: true
        },

        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true
        },

        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        notes: {
            type: String,
            trim: true
        },

        photo: {
            url: {
                type: String
            },
            publicId: {
                type: String
            }
        }
    },
    {
        timestamps: true
    }
);

const HaircutHistory = mongoose.model(
    "HaircutHistory",
    haircutHistorySchema
);

export default HaircutHistory;