import { faker } from '@faker-js/faker';
import Student from '../models/Student.js';
import Exception from '../exceptions/Exception.js';

const getAllStudents = async ({ page, size, searchString }) => {
    const matchOption = {
        $regex: `.*${searchString}.*`,
        $options: 'i'
    };

    console.log({ page, size, searchString, matchOption })

    let filteredStudents = await Student.aggregate([
        {
            $match: {
                $or: [
                    {
                        name: matchOption,
                    },
                    {
                        email: matchOption,
                    },
                    {
                        address: matchOption,
                    }
                ]
            }
        },
        {
            $skip: (page - 1) * size
        },
        {
            $limit: size
        }
    ]);

    return filteredStudents;
}

const getStudentById = async (studentId) => {
    try {
        const student = await Student.findById(studentId);
        return student;
    } catch (error) {
        throw new Exception(Exception.CANNOT_GET_STUDENT);
    }
}

const insertStudent = async ({ name, email, languages, gender, phoneNumber, address }) => {
    const student = await Student.create({
        name,
        email,
        languages,
        gender,
        phoneNumber,
        address
    });
    return student;
}

const updateStudent = async ({ id, name, email, languages, gender, phoneNumber, address }) => {
    const student = await Student.findById(id);

    student.name = name ?? student.name;
    student.email = email ?? student.email;
    student.languages = languages ?? student.languages;
    student.gender = gender ?? student.gender;
    student.phoneNumber = phoneNumber ?? student.phoneNumber;
    student.address = address ?? student.address;

    await student.save();
    return student;
}

const generateFakeStudents = async () => {
    let fakeStudents = [];
    for (let i = 0; i < 1000; i++) {
        let fakeStudent = {
            name: faker.person.fullName() + ' Fake',
            email: faker.internet.email(),
            languages: [
                faker.helpers.arrayElement(['English', 'Vietnamese', 'French']),
                faker.helpers.arrayElement(['Korean', 'Japanese', 'Chinese']),
            ],
            gender: faker.helpers.arrayElement(['Male', 'Female']),
            phoneNumber: faker.phone.number(),
            address: faker.location.streetAddress()
        }
        fakeStudents.push(fakeStudent);
    }
    await Student.insertMany(fakeStudents);
}

export default { getAllStudents, getStudentById, insertStudent, updateStudent, generateFakeStudents }