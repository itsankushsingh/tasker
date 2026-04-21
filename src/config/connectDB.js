import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { DB_NAME } from '../constants.js';

dotenv.config({
    path:'./.env'
})

const URI = `${process.env.MONGODB_URI}/${DB_NAME}`


// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(`${URI}`);
        console.log("\nMongoDB Connected Successfully");
    } catch(error) {
        console.log("MongoDB Connection Error: ", error);
        process.exit(1);
    }
}


export { connectDB };