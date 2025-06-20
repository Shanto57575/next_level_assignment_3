import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3001;

const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(
      process.env.MONGODB_URL as string
    );
    console.log(
      `MONGODB CONNECTED!!! CONNECTION HOST: ${dbConnection.connection.host}`
    );
  } catch (error) {
    console.log("Database connection error", error);
  }
};

app.listen(PORT, () => {
  connectDB();
  console.log(`SERVER IS RUNNING ON PORT : ${PORT}`);
});
