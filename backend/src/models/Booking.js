import mongoose from "mongoose";

const bookingServiceSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
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
    }
  },
  { _id: false }  // to remove overhead.
);

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

    services: {
      type: [bookingServiceSchema],
      required: true,
      validate: {
        validator: function (services) {
          return services.length > 0;
        },
        message: "A booking must contain at least one service"
      }
    },

    appointmentDate: {
      type: Date,
      required: true
    },

    startTime: {
      type: Date,
      required: true
    },

    endTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (endTime) {
          return !this.startTime || endTime > this.startTime;
        },
        message: "End time must be after start time"
      }
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },

    totalDuration: {
      type: Number,
      required: true,
      min: 1
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed"],
      default: "confirmed"
    }
  },
  { timestamps: true }
);

// Indexes, so that time-slot lookups becomes incredibly fast.
bookingSchema.index({
  barber: 1,
  startTime: 1,
  endTime: 1
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;