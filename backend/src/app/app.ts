import express from 'express'
import swaggerUi from 'swagger-ui-express'
import apiDocs from './controllers/apiDocs.ts'
import careersRouter from './controllers/careers/index.ts'
import levelsRouter from './controllers/levels/index.ts'

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(apiDocs))

app.use('/careers', careersRouter)
app.use('/levels', levelsRouter)

export default app