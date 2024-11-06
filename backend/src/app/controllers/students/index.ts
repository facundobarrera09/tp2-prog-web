import { Router } from "express";
import postStudentRouter from "./post-addStudent";
import getStudentsRouter from "./get-students";

const studentsRouter = Router()

studentsRouter.use(
    postStudentRouter,
    getStudentsRouter
)

export default studentsRouter