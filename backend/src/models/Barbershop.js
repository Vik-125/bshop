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

    description: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    images: [   // storing all sort of picture of the shop, etc.
      {
        url: String,
        publicId: String,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

 barbershopSchema.index(
    { owner: 1, name: 1, address: 1 },
    { unique: true }
);
const Barbershop = mongoose.model("Barbershop", barbershopSchema);

export default Barbershop;
