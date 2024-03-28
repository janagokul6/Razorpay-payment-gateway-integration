import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
dotenv.config()
const mongoDbURL = process.env.MONGO_URI 


export const connectToDatabase = async () =>
    mongoose.connect(mongoDbURL)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB', err);
        });










