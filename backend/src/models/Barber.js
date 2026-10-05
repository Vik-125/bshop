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

    workingHours: {
      start: {
        type: Number,
        required: true,
      },
      end: {
        type: Number,
        required: true,
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
