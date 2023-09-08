import express from 'express'
import 'dotenv/config'
import './database'

const app = express()

app.listen(3333, () => console.log('Server is Running!'))
