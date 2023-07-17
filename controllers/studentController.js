import studentRepository from '../repositories/studentRepository.js';
import HttpStatusCode from "../exceptions/HttpStatusCode.js"
import { MAX_RECORDS } from '../global/constants.js';

const getAllStudents = async (req, res) => {
    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query;

    // Handle query data
    size = parseInt(size);
    page = parseInt(page);
    size = size > MAX_RECORDS ? MAX_RECORDS : size;

    try {
        const students = await studentRepository.getAllStudents({
            page, size, searchString
        })
        res.status(HttpStatusCode.OK).json({
            message:'Get students successfully.',
            size: students.length,
            page,
            searchString,
            data: students
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}

const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await studentRepository.getStudentById(studentId);
        res.status(HttpStatusCode.OK).json({
            message: 'Get student successfully.',
            data: student
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}

const updateStudent = async (req, res) => {
    try {
        const student = await studentRepository.updateStudent(req.body);
        res.status(HttpStatusCode.OK).json({
            message: 'Update student successfully.',
            data: student
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}

const insertStudent = async (req, res) => {
    try {
        const student = await studentRepository.insertStudent(req.body);
        res.status(HttpStatusCode.OK).json({
            message: 'Insert student successfully.',
            data: student
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert student: ' + error.message
        })
    }
}

const generateFakeStudents = async (req, res) => {
    try {
        await studentRepository.generateFakeStudents();
        res.status(HttpStatusCode.CREATED).json({
            message: 'Insert fake students successfully.'
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert fake students.'
        })
    }
}

export default { getAllStudents, getStudentById, updateStudent, insertStudent, generateFakeStudents }