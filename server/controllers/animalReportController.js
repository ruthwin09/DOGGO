const AnimalReport = require('../models/AnimalReport')

// ==========================================
// CREATE ANIMAL REPORT
// ==========================================

const createAnimalReport = async (req, res) => {
  try {
    const {
      animalType,
      title,
      description,
      injuryType,
      severity,
      photos,
      location,
      contactPhone,
    } = req.body

    // Validate required fields
    if (
      !animalType ||
      !title ||
      !description ||
      !injuryType ||
      !severity ||
      !location ||
      location.latitude === undefined ||
      location.longitude === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Animal type, title, description, injury type, severity and location are required',
      })
    }

    const latitude = Number(location.latitude)
    const longitude = Number(location.longitude)

    // Validate coordinates
    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid latitude or longitude',
      })
    }

    // Create report
    const report = await AnimalReport.create({
      reporter: req.user._id,

      animalType,

      title: title.trim(),

      description: description.trim(),

      injuryType,

      severity,

      photos: Array.isArray(photos)
        ? photos
        : [],

      location: {
        address: location.address
          ? location.address.trim()
          : '',

        latitude,

        longitude,

        // GeoJSON uses [longitude, latitude]
        coordinates: [
          longitude,
          latitude,
        ],
      },

      contactPhone: contactPhone
        ? contactPhone.trim()
        : req.user.phone || '',
    })

    // Get report with reporter information
    const populatedReport =
      await AnimalReport.findById(
        report._id
      ).populate(
        'reporter',
        'name email phone profileImage'
      )

    return res.status(201).json({
      success: true,
      message:
        'Animal rescue report created successfully',
      report: populatedReport,
    })
  } catch (error) {
    console.error(
      'Create animal report error:',
      error.message
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to create animal report',
    })
  }
}

// ==========================================
// GET NEARBY ANIMAL REPORTS
// ==========================================

const getNearbyReports = async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      radius = 10,
    } = req.query

    const lat = Number(latitude)
    const lng = Number(longitude)
    const radiusKm = Number(radius)

    // Validate coordinates
    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng)
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Valid latitude and longitude are required',
      })
    }

    // Validate coordinate ranges
    if (
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid latitude or longitude',
      })
    }

    // Validate radius
    if (
      !Number.isFinite(radiusKm) ||
      radiusKm <= 0 ||
      radiusKm > 100
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Radius must be between 1 and 100 km',
      })
    }

    // Find reports within radius
    const reports =
      await AnimalReport.find({
        'location.coordinates': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
            $maxDistance:
              radiusKm * 1000,
          },
        },
      })
        .populate(
          'reporter',
          'name profileImage phone'
        )
        .sort({
          createdAt: -1,
        })

    return res.status(200).json({
      success: true,
      count: reports.length,
      radius: radiusKm,
      reports,
    })
  } catch (error) {
    console.error(
      'Get nearby reports error:',
      error.message
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to retrieve nearby reports',
    })
  }
}

// ==========================================
// GET MY ANIMAL REPORTS
// ==========================================

const getMyReports = async (req, res) => {
  try {
    const reports =
      await AnimalReport.find({
        reporter: req.user._id,
      })
        .populate(
          'reporter',
          'name email phone profileImage'
        )
        .sort({
          createdAt: -1,
        })

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    })
  } catch (error) {
    console.error(
      'Get my reports error:',
      error.message
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to retrieve your reports',
    })
  }
}

// ==========================================
// GET SINGLE ANIMAL REPORT
// ==========================================

const getAnimalReport = async (req, res) => {
  try {
    const { id } = req.params

    const report =
      await AnimalReport.findById(id)
        .populate(
          'reporter',
          'name email phone profileImage'
        )

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Animal report not found',
      })
    }

    return res.status(200).json({
      success: true,
      report,
    })
  } catch (error) {
    console.error(
      'Get animal report error:',
      error.message
    )

    // Invalid MongoDB ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID',
      })
    }

    return res.status(500).json({
      success: false,
      message:
        'Unable to retrieve animal report',
    })
  }
}
// ==========================================
// UPDATE ANIMAL REPORT STATUS
// ==========================================

const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const allowedStatuses = [
      'reported',
      'verified',
      'rescue_assigned',
      'in_treatment',
      'recovered',
      'closed',
    ]

    // Validate status
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      })
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid report status',
        allowedStatuses,
      })
    }

    // Find report
    const report = await AnimalReport.findById(id)

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Animal report not found',
      })
    }

    // Only report owner can update for now
    if (
      report.reporter.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          'You are not authorized to update this report',
      })
    }

    // Update status
    report.status = status

    await report.save()

    const updatedReport =
      await AnimalReport.findById(report._id).populate(
        'reporter',
        'name email phone profileImage'
      )

    return res.status(200).json({
      success: true,
      message: 'Report status updated successfully',
      report: updatedReport,
    })
  } catch (error) {
    console.error(
      'Update report status error:',
      error.message
    )

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID',
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Unable to update report status',
    })
  }
}
// ==========================================
// GET RESCUE DASHBOARD STATISTICS
// ==========================================

const getReportStats = async (req, res) => {
  try {
    const stats = await AnimalReport.aggregate([
      {
        $group: {
          _id: '$status',
          count: {
            $sum: 1,
          },
        },
      },
    ])

    const statusCounts = {
      reported: 0,
      verified: 0,
      rescue_assigned: 0,
      in_treatment: 0,
      recovered: 0,
      closed: 0,
    }

    stats.forEach((item) => {
      if (
        Object.prototype.hasOwnProperty.call(
          statusCounts,
          item._id
        )
      ) {
        statusCounts[item._id] = item.count
      }
    })

    const totalReports =
      Object.values(statusCounts).reduce(
        (total, count) => total + count,
        0
      )

    return res.status(200).json({
      success: true,
      totalReports,
      statusCounts,
    })
  } catch (error) {
    console.error(
      'Get report statistics error:',
      error.message
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to retrieve report statistics',
    })
  }
}
// ==========================================
// GET ANIMAL REPORTS
// WITH FILTERING + PAGINATION
// ==========================================

const getReports = async (req, res) => {
  try {
    const {
      status,
      animalType,
      severity,
      injuryType,
      page = 1,
      limit = 10,
    } = req.query

    // ==========================================
    // ALLOWED FILTER VALUES
    // ==========================================

    const allowedStatuses = [
      'reported',
      'verified',
      'rescue_assigned',
      'in_treatment',
      'recovered',
      'closed',
    ]

    const allowedAnimalTypes = [
      'dog',
      'cat',
      'other',
    ]

    const allowedSeverities = [
      'low',
      'medium',
      'high',
      'critical',
    ]

    const allowedInjuryTypes = [
      'injury',
      'accident',
      'illness',
      'abandoned',
      'trapped',
      'other',
    ]

    // ==========================================
    // VALIDATE FILTERS
    // ==========================================

    if (
      status &&
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status filter',
        allowedValues: allowedStatuses,
      })
    }

    if (
      animalType &&
      !allowedAnimalTypes.includes(animalType)
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid animalType filter',
        allowedValues:
          allowedAnimalTypes,
      })
    }

    if (
      severity &&
      !allowedSeverities.includes(severity)
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid severity filter',
        allowedValues:
          allowedSeverities,
      })
    }

    if (
      injuryType &&
      !allowedInjuryTypes.includes(
        injuryType
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid injuryType filter',
        allowedValues:
          allowedInjuryTypes,
      })
    }

    // ==========================================
    // PAGINATION
    // ==========================================

    const currentPage = Math.max(
      Number(page) || 1,
      1
    )

    const requestedLimit =
      Number(limit) || 10

    const reportsPerPage = Math.min(
      Math.max(requestedLimit, 1),
      50
    )

    const skip =
      (currentPage - 1) *
      reportsPerPage

    // ==========================================
    // BUILD MONGODB FILTER
    // ==========================================

    const filter = {}

    if (status) {
      filter.status = status
    }

    if (animalType) {
      filter.animalType = animalType
    }

    if (severity) {
      filter.severity = severity
    }

    if (injuryType) {
      filter.injuryType = injuryType
    }

    // ==========================================
    // GET TOTAL MATCHING REPORTS
    // ==========================================

    const totalReports =
      await AnimalReport.countDocuments(
        filter
      )

    // ==========================================
    // GET PAGINATED REPORTS
    // ==========================================

    const reports =
      await AnimalReport.find(filter)
        .populate(
          'reporter',
          'name profileImage phone'
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(reportsPerPage)

    const totalPages =
      Math.ceil(
        totalReports /
          reportsPerPage
      )

    return res.status(200).json({
      success: true,

      reports,

      pagination: {
        currentPage,

        limit: reportsPerPage,

        totalReports,

        totalPages,

        hasNextPage:
          currentPage <
          totalPages,

        hasPreviousPage:
          currentPage > 1,
      },
    })
  } catch (error) {
    console.error(
      'Get reports error:',
      error.message
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to retrieve animal reports',
    })
  }
}
// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {
  createAnimalReport,
  getNearbyReports,
  getMyReports,
  getAnimalReport,
  updateReportStatus,
  getReportStats,
  getReports,
}