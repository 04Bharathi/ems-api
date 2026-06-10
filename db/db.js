import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Success")
    } catch(e) {
        console.log(e)
    }
}

export default connectToDb;