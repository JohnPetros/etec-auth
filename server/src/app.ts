import express from 'express'
import 'dotenv/config'
import './database'

import { appConfig } from './configs/appConfig'

const app = express()

appConfig(app)

const PORT = process.env.PORT ?? 3333

app.listen(PORT, () =>
  console.log('Server is running on port ' + PORT)
)
