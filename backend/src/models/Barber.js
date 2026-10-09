import mongoose from "mongoose";

const barberSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barbershop",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    bio: {
      type: String,
      trim: true,
    },

    experience: {
      type: String,
      trim: true,
    },

    specialization: {
      type: String,
      min: 0,
    },

    specialization: {
      type: String,
      trim: true,
    },

    image: {
      url: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    workingHours: {    // Minutes=(Hour×60)+Minute
      start: {
        type: Number,
        required: true,
        min: 0,
        max: 1439,
      },
      end: {
        type: Number,
        required: true,
        min: 1,                 // For making the check that start < end
        max: 1440,              // represents midnight.
      },
    },
  },
  {
    timestamps: true,
  },
);

barberSchema.index({ shop: 1, name: 1 }, { unique: true });

const Barber = mongoose.model("Barber", barberSchema);

export default Barber;
