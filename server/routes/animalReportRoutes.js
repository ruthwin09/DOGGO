const express = require('express')

const {
  createAnimalReport,
  getNearbyReports,
  getMyReports,
  getAnimalReport,
  updateReportStatus,
  getReportStats,
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
// GET RESCUE DASHBOARD STATISTICS
// ==========================================

router.get(
  '/stats',
  protect,
  getReportStats
)

// ==========================================
// GET SINGLE ANIMAL REPORT
// ==========================================

router.get(
  '/:id',
  protect,
  getAnimalReport
)

// ==========================================
// UPDATE REPORT STATUS
// ==========================================

router.patch(
  '/:id/status',
  protect,
  updateReportStatus
)

module.exports = router