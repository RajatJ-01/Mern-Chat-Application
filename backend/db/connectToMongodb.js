import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URL);
  } catch (error) {
    console.log("error connecting to Mongodb", error.message);
  }
};

export default connectToMongoDB;
