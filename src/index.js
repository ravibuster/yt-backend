//require("dotenv").config({ path: './env' }); 
// // Load environment variables from .env file
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./env"
});

connectDB()
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})
.catch(
  (error) => {  
    console.log("Error connecting to MongoDB:", error);
  }
);











// Approach 1: Using Mongoose to connect to MongoDB and start an Express server
// import mongoose from "mongoose";
// import{DB_NAME} from "./constants.js";
// import express from "express";

// const app = express();

// (async () => {
//   try {
//     const connectDB = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//     app.on("error", (err) => {
//       console.error("Express error:", err);
//     });
//     console.log("Connected to MongoDB");

//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// })();