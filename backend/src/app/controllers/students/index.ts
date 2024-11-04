import { Router } from "express";
import postStudentRouter from "./post-addStudent";

const studentsRouter = Router()

studentsRouter.use(
    postStudentRouter
)

export default studentsRouter