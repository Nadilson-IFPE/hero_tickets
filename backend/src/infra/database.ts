import mongoose from "mongoose";

const url = 'YOUR_MONGODB_URL_HERE';

export async function connect() {

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }

    try {
        await mongoose.connect(url);
        console.log('Connect to database success')
    } catch (error) {
        console.log('Error:', error);
    }

}