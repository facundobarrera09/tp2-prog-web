import Joi from "joi";

const createStudentSchema = Joi.object().keys({
    firstname: Joi.string().regex(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+$/).min(2).max(25).required(),
    lastname: Joi.string().regex(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+$/).min(2).max(25).required(),
    dni: Joi.number().min(6).max(8).required(),
    email: Joi.string().regex(/^[0-9a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+@[0-9a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+\.[a-zA-Z]{2,}$/).max(100).required(),
})

export {
    createStudentSchema
}