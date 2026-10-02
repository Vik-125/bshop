import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("DB connect successfully");
    } catch(error) {
        console.error("DB connection failed: ", error);
        process.exit(1);
    }
};


export default connectDB;