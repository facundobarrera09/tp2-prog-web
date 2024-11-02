import { RequestHandler, Router } from 'express'
import { OpenAPIV3 } from 'openapi-types'
import { createStudentSchema } from './schemas/student.schemas'
import studentsService from '../../services/studentsService'

const docs: OpenAPIV3.PathsObject = {
    '/': {
        "post": {
            "description": "Create a Student",
            "operationId": "createStudent",
            "requestBody": { 
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "required": ["name", "careerId"],
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "pattern": "/[A-Z0-9][a-z0-9]{1,10}}/",
                                    "example": "1st year"
                                },
                                "careerId": {
                                    "type": "number",
                                    "example": 4
                                }
                            }
                        } 
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Success creating the new Level",
                },
                "400": {
                    "description": "Missing or wrong information to create the Level"
                },
                "401": {
                    "description": "User is not authenticated"
                }
            },
            "tags": ["Careers"]
        }
    }
}

const postStudentRouter: Router = Router()

const validateBody: RequestHandler = async (req, res, next) => {
    const validationResult = createStudentSchema.validate(req.body, { abortEarly: false, stripUnknown: true })

    if (validationResult.error) {
        res.status(400).json(validationResult.error)
        return
    }

    next()
}

const requestHandler: RequestHandler = (req, res) => {
    const { firstname, lastname, dni, email }: {firstname: string, lastname: string, dni: number, email: string} = req.body

    const newStudent = studentsService.create(firstname, lastname, dni, email)

    if (!newStudent) {
        res.status(400).json({error: "Student already exists"})
        return
    }

    res.status(201).json({student: newStudent})
}

postStudentRouter.post('/', 
    validateBody, 
    requestHandler
)

export default postStudentRouter
export { docs }