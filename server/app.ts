import express from 'express'
import 'dotenv/config'
import './database'

import { routes } from './routes'

const app = express()

app.use('/auth', routes)

app.listen(3333, () => console.log('Server is Running!'))
