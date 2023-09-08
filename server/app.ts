import express from 'express'
import 'dotenv/config'
import './database'

import { routes } from './routes'

const app = express()

app.use(express.json())

app.use('/auth', routes)

app.listen(process.env.PORT ?? 3333, () =>
  console.log('Server is running on port ' + process.env.PORT)
)
