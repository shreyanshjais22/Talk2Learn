import mongoose from "mongoose";
const connectDB = async () => {
  try {
    
    mongoose.connection.on("connected", () =>
      console.log("Datebase Connected")
    );
    const resp = await mongoose.connect(process.env.MONGODB_URI);
    console.log(resp.connection.host);
    
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;