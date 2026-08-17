import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        mongoose.connection.on("connected" , () => console.log("mongodb is connected"));
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error("database connection failed" , error.message);
    }
}
