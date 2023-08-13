import mongoose from "mongoose";

const url = 'mongodb+srv://nadilson:gfeOKAmYtQWkPwqu@cluster0.2jroq7s.mongodb.net/hero-tickets';

export async function connect() {

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }

    try {
        await mongoose.connect(url);
        console.log('Connect to database success');
    } catch (error) {
        console.log('Error:', error);
    }

}