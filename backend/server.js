import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send(`
    <div>
      <h1>Serapium</h1>
      <hr />
      <p>Inventory Management System</p>
    </div>
  `)
})

app.listen(5000, () => {
  connectDB()
  console.log(`Server listening on Port 5000`)
})