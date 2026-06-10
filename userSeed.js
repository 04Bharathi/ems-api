import User from "./models/User.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv";
import connectToDb from "./db/db.js"

dotenv.config()


const userRegister = async () => {
    const adminPassword = process.env.ADMIN_PASSWORD
    connectToDb()
    try {
        const hashPassword = await bcrypt.hash(adminPassword, 8)
        const newUser = new User({
            name: "admin", 
            email: "zenitsu@gmail.com", 
            password: hashPassword, 
            role: "admin"
        })
        await newUser.save()
    } catch(e) {
        console.log(e)
    }
}

userRegister()