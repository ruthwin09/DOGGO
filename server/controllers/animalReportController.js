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

        latitude: Number(location.latitude),

        longitude: Number(location.longitude),
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

module.exports = {
  createAnimalReport,
}