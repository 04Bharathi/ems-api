import express from 'express'
import cors from 'cors'

import authRouter from './routes/authRoute.js'
import departmentRoute from './routes/departmentRoute.js'
import employeeRoute from './routes/employeeRoute.js'
import salaryRoute from './routes/salaryRoute.js'
import leaveRoute from './routes/leaveRoutes.js'
import settingsRoute from './routes/settingsRoute.js' 
import dashboardRoute from './routes/dashboardRoutes.js'
import connectToDb from './db/db.js'


connectToDb()
const app = express()
app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.use(express.json())
app.use('/uploads',express.static('public/uploads'))

app.use('/api', settingsRoute)
app.use("/api/auth", authRouter)
app.use("/api/department", departmentRoute)
app.use('/api/employee', employeeRoute)
app.use('/api/salary', salaryRoute)
app.use('/api/leave', leaveRoute)
app.use('/api/dashboard', dashboardRoute)

app.listen(5000, () => {
    console.log("Done")
})