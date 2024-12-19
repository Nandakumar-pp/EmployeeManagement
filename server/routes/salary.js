import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addSalary,upload } from '../controllers/salaryController.js'
import {getSalary,getSalaries} from '../controllers/salaryController.js'
const router =express.Router()

router.post('/add',authMiddleware,upload.single("receipt"),addSalary)
router.get('/:id',authMiddleware,getSalary)
router.get('/',authMiddleware,getSalaries)
//router.get('/',authMiddleware,getSalaries)

export default router