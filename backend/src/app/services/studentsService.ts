import { PrismaClient } from "@prisma/client"

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

function findByEmail(email: string) {
    return findAll()
        .find(student => student.email === email)
}

async function create(firstname: string, lastname: string, dni: bigint, email: string) {
    const student = {
        sid: ((await prisma.student.findFirst({ orderBy: { sid: 'desc' } }))?.sid || 990n) + 10n,
        firstname,
        lastname,
        dni,
        email
    }

    const studentWithSameEmail = await prisma.student.findFirst({ where: { email }})
    const studentWithSameDni = await prisma.student.findFirst({ where: { dni }})

    if (!(studentWithSameDni || studentWithSameEmail)) {
        return await prisma.student.create({ select: { sid: true, firstname: true, lastname: true, dni: true, email: true }, data: student })
    }
}

const studentsService = { findAll, findById, create, findByDni, findByEmail }
export default studentsService