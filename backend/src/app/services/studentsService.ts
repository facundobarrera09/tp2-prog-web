import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function findAll() {
    return await prisma.student.findMany({ where: { deleted: false } })
}

async function findById(id: number) {
    return await prisma.student.findUnique({ where: { id, deleted: false } })
}

async function findByDni(dni: bigint) {
    return await prisma.student.findFirst({ where: { dni, deleted: false } })
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

const studentsService = { findAll, findById, findByDni, create }
export default studentsService