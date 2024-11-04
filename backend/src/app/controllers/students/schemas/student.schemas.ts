import Joi from "joi";

const validNameRegex = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+( [a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+)?$/

export interface CreateStudyRequestBody {
    firstname: string,
    lastname: string,
    dni: bigint,
    email: string
}

const createStudentSchema = Joi.object<CreateStudyRequestBody>().keys({
    firstname: Joi.string().regex(validNameRegex).min(2).max(25).required(),
    lastname: Joi.string().regex(validNameRegex).min(2).max(25).required(),
    dni: Joi.number().max(100000000).required(),
    email: Joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).max(100).required(),
})

export {
    createStudentSchema,
    validNameRegex
}