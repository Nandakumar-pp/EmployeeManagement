import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addLeaveDates,getLeaveDates} from '../controllers/attendanceController.js'
//import {  } from '../controllers/salaryController.js'
//import {getSalary,getSalaries} from '../controllers/salaryController.js'

const router =express.Router()

router.post('/add',authMiddleware,addLeaveDates)
router.get('/:id',authMiddleware,getLeaveDates)
// router.get('/detail/:id',authMiddleware,getLeaveDetail)
// router.put('/:id',authMiddleware,updateLeave)
// router.get('/emp/:id',authMiddleware,getEmpLeave)
// router.get('/',authMiddleware,getLeaves)
//router.get('/',authMiddleware,getSalaries)

export default router