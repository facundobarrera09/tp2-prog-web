import express from 'express'
import swaggerUi from 'swagger-ui-express'
import apiDocs from './controllers/apiDocs.ts'
import studentsRouter from './controllers/students/index.ts'

// @ts-ignore
// Allow for BigInt JSON serialization
BigInt.prototype["toJSON"] = function () { 
    return this.toString() + "n"
}

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(apiDocs))

app.use('/students', studentsRouter)

export default app