const express = require('express')

const {
  createAnimalReport,
} = require('../controllers/animalReportController')

const {
  protect,
} = require('../middleware/authMiddleware')

const router = express.Router()

// Create animal rescue report
router.post(
  '/',
  protect,
  createAnimalReport
)

module.exports = router