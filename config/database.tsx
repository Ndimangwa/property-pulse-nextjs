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
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        connected = conn.connections[0].readyState === 1;
    } catch (err)   {
        console.log(err);
        connected = false;
    }
}
export default connectDB;