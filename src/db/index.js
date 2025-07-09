import mongoose from "mongoose";
import{DB_NAME} from "../constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, {
  
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error for further handling
  }
}

export default connectDB;