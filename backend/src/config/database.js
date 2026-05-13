import mongoose from "mongoose";

const connectDB = async () => {
try {
    const connectiondb = await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log(`MongoDB connected: ${connectiondb.connection.host}`); 
} catch (error) {
     
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
}
}

export default connectDB; 
