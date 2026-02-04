import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);
    if (connected)  {
        console.log('MongoDB is connected');
        return;
    }
    //Now connect
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
    } catch (err)   {
        console.log(err);
        connected = false;
    }
}
export default connectDB;