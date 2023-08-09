import mongoose from "mongoose";

let isConnected = false;

export const connectToBD = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoBD is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoBD connected");
  } catch (error) {
    console.log(error);
  }
};