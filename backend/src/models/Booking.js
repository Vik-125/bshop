import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        shop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Barbershop",
            required: true
        },

        barber: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Barber",
            required: true
        },

        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true
        },

        serviceName: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        duration: {
            type: Number,
            required: true,
            min: 1
        },

        appointmentDate: {
            type: Date,
            required: true
        },

        startTime: {
            type: String,
            required: true
        },

        endTime: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["confirmed", "completed", "cancelled"],
            default: "confirmed"
        }
    },
    {
        timestamps: true
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;