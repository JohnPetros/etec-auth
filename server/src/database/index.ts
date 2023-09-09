import mongoose from 'mongoose'

const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD

mongoose
  .connect(
    `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@cluster0.zibrbsm.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Database has been initialized')
  })
  .catch((error) => {
    console.error(error)
  })
