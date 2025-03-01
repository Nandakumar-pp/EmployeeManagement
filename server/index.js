import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import connectToDatabase from './db/db.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingRouter from './routes/setting.js'
 connectToDatabase()
 const app=express()
 
 app.use(cors()) 
 app.use(express.json())
 app.use(express.static('public/uploads'))
 app.use('/api/auth',authRouter)
 app.use('/api/employee',employeeRouter)
 app.use('/api/salary',salaryRouter)
 app.use('/api/leave',leaveRouter)
 app.use('/api/setting',settingRouter)
 
 app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
 })