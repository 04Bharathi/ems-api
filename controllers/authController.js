import bcrypt from 'bcrypt'

import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

export const userLogin = async (req, res) => {
    try {

        const {email, password} = req.body
        const user = await User.findOne({email})

        if (!user) {
            return res.status(404).json({success: false, message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({success: false, message: "Incorrect Password"})
        }

        const token = generateToken(user)
        return res.status(200).json({success: true, token, user: {
            id: user._id, 
            name: user.name, 
            email: user.email, 
            role: user.role
        }})

    } catch(e) {
        return res.status(500).json({
            success: false, 
            message: "Server Error"
        })
        console.log(e.message)
    }
}

export const verify = async (req, res) => {
    return res.status(200).json({
        success: true, user: req.user
    })
}

