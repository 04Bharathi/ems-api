import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const changePassword = async (req, res) => {
    try {
        const {userId, oldPassword, newPassword, confirmPassword} = req.body
        console.log(userId)

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false, 
                message: "Incorrect password"
            })
        }

        if (confirmPassword !== newPassword) {
            return res.status(400).json({
                success: false, 
                message: "Password didn't match"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 8)
        await User.findByIdAndUpdate(userId, {password: hashedPassword})
        return res.status(200).json({
            success: true, 
            message: "Password Changed Successfully"
        })

    } catch(e) {
        return res.status(500).json({
            success: false, 
            message: e.message
        })
    }
}

