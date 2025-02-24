import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'

dotenv.config()

const app = express()

app.post('/products', async (req, res) => {
  const product = req.body

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all fields'
    })
  }
})

app.listen(5000, () => {
  connectDB()
  console.log(`Server listening on Port 5000`)
})