import express from 'express';
import studentController from '../controllers/studentController.js';

const router = express.Router();

router.get('/', studentController.getAllStudents)

router.get('/:id', studentController.getStudentById)

router.post('/', studentController.insertStudent)

router.post('/generateFakeStudents', studentController.generateFakeStudents)

router.patch('/', studentController.updateStudent)

export default router;