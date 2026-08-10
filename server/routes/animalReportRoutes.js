const express = require('express')

const {
  createAnimalReport,
  getNearbyReports,
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

// Get nearby animal reports
router.get(
  '/nearby',
  protect,
  getNearbyReports
)

module.exports = router