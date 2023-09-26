import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    const dbconn = await mongoose.connect("mongodb+srv://mongo:nOcFZCwAvstIG16Z@cluster0.gbaiebn.mongodb.net/E-com");
    if (dbconn) {
      console.log("Database connected");
      return dbconn; // Optionally return the connection object
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Rethrow the error so that calling code can handle it
  }
};

export default dbconnect;
