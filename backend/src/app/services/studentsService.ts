import { get } from "http"
import Student from "../models/Student"

const students: Student[] = [
    new Student(1, 1, 'Juan', 'Perez', 12345678, 'juanperez@gmail.com'),
    new Student(2, 2, 'Maria', 'Gomez', 87654321, 'mariagomez@hotmail.com'),
    new Student(3, 3, 'Carlos', 'Lopez', 45678912, 'carloslopez@outlook.com')
]

function getNextId() {
    return students.length === 0 ? 1 :
        Math.max(...students.map(student => student.id)) + 1
}

function findAll() {
    return students
        .filter(student => !student.deleted)
}

function findById(id: number) {
    return findAll()
        .find(student => student.id === id)
}

function findByDni(dni: number) {
    return findAll()
        .find(student => student.dni === dni)
}

function create(firstname: string, lastname: string, dni: number, email: string) {
    const newStudent = new Student(getNextId(), getNextId(), firstname, lastname, dni, email) //Pensar la forma de asignar el sid

    if (!findAll().find(student => student.firstname === firstname)) {
        students.push(newStudent)
        return newStudent
    }
}

const studentsService = { findAll, findById, create }
export default studentsService