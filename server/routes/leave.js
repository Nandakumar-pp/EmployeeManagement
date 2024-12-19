import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addLeave,getLeave,getLeaves,getLeaveDetail ,updateLeave, getEmpLeave} from '../controllers/leaveController.js'
//import {  } from '../controllers/salaryController.js'
//import {getSalary,getSalaries} from '../controllers/salaryController.js'

const router =express.Router()

router.post('/add',authMiddleware,addLeave)
router.get('/:id',authMiddleware,getLeave)
router.get('/detail/:id',authMiddleware,getLeaveDetail)
router.put('/:id',authMiddleware,updateLeave)
router.get('/emp/:id',authMiddleware,getEmpLeave)
router.get('/',authMiddleware,getLeaves)
//router.get('/',authMiddleware,getSalaries)

export default router