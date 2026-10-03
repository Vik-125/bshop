import mongoose from "mongoose";

const barbershopSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      reqired: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    adress: {
      type: String,
      required: true,
      trim: true,
    },

    images: [
      {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Barbershop = mongoose.model("Barbershop", barbershopSchema);

export default Barbershop;