import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB is already connected");
      return;
    }

    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("MongoDB Connection Successful ✅");
  } catch (error) {
    console.error("MongoDB Connection Error ❌:", error);
    throw error; // Propagate the error to handle it in the route
  }
};