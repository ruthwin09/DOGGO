const express = require('express')

const {
  createAnimalReport,
  getNearbyReports,
  getMyReports,
  getAnimalReport,
} = require('../controllers/animalReportController')

const {
  protect,
} = require('../middleware/authMiddleware')

const router = express.Router()

// ==========================================
// CREATE ANIMAL RESCUE REPORT
// ==========================================

router.post(
  '/',
  protect,
  createAnimalReport
)

// ==========================================
// GET NEARBY ANIMAL REPORTS
// ==========================================

router.get(
  '/nearby',
  protect,
  getNearbyReports
)

// ==========================================
// GET MY REPORTS
// ==========================================

router.get(
  '/my',
  protect,
  getMyReports
)

// ==========================================
// GET SINGLE ANIMAL REPORT
// ==========================================

router.get(
  '/:id',
  protect,
  getAnimalReport
)

module.exports = router