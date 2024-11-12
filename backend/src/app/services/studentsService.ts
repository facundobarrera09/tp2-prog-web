import { PrismaClient, Prisma } from "@prisma/client"
import { bigintToNumber } from "../utils/bigintToNumber"

const prisma = new PrismaClient()

type Student = Prisma.StudentGetPayload<{ select: { id: true, sid: true, dni: true, email: true, firstname: true, lastname: true } }>

async function getStudents(criteria: string = "", currentPage: number = 1, pageSize: number = 5) {
    const countResult = (await prisma.$queryRaw<{ count: bigint }[]>`
            SELECT COUNT(s.id)
            FROM "Student" AS s
            WHERE
                (
                    translate(lower(concat(s.sid, ' ', s.firstname, ' ', s.lastname)), 'áéíóúü', 'aeiouu')
                    LIKE
                    translate(lower(${'%' + criteria + '%'}), 'áéíóúü', 'aeiouu')
                )
                AND s.deleted = false
        `)[0].count

    const count = bigintToNumber(countResult)

    const maxPage = Math.ceil(count / pageSize) === 0 ? 1 : Math.ceil(count / pageSize)

    const students = await prisma.$queryRaw<Student[]>`
            SELECT s.id, s.sid, s.firstname, s.lastname, s.dni, s.email
            FROM "Student" AS s
            WHERE
                (
                    translate(lower(concat(s.sid, ' ', s.firstname, ' ', s.lastname)), 'áéíóúü', 'aeiouu')
                    LIKE
                    translate(lower(${'%' + criteria + '%'}), 'áéíóúü', 'aeiouu')
                )
                AND s.deleted = false
            ORDER BY s.sid ASC
            LIMIT ${pageSize}
            OFFSET ${((currentPage <= maxPage ? currentPage : maxPage) - 1) * pageSize}
        `

    return {
        students: students || [],
        count: count || 0
    }
}

async function findById(id: number) {
    return await prisma.student.findUnique({ where: { id, deleted: false } })
}

async function findByDni(dni: number) {
    return await prisma.student.findUnique({ where: { dni, deleted: false } })
}

async function findByEmail(email: string) {
    return await prisma.student.findUnique({ where: { email, deleted: false } })
}

async function create(firstname: string, lastname: string, dni: bigint, email: string) {
    const student = {
        sid: ((await prisma.student.findFirst({ orderBy: { sid: 'desc' } }))?.sid || 990n) + 10n,
        firstname,
        lastname,
        dni,
        email
    }

    /** @todo Optimizar (eliminar queries innecesarias) */
    const studentWithSameEmail = await prisma.student.findFirst({ where: { email } })
    const studentWithSameDni = await prisma.student.findFirst({ where: { dni } })

    if (!(studentWithSameDni || studentWithSameEmail)) {
        return await prisma.student.create({ select: { sid: true, firstname: true, lastname: true, dni: true, email: true }, data: student })
    }
}

const studentsService = { getStudents, findById, findByDni, create, findByEmail }
export default studentsService