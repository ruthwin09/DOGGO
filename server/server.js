const express = require('express')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./config/db')

const app = express()

const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'DOGGO API is running',
  })
})

// Start server only after database connection
const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`DOGGO API running on port ${PORT}`)
    })
  } catch (error) {
    console.error(`Server startup failed: ${error.message}`)
    process.exit(1)
  }
}

startServer()