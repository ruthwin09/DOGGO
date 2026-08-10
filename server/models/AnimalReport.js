const mongoose = require('mongoose')

const animalReportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    animalType: {
      type: String,
      enum: ['dog', 'cat', 'other'],
      required: [true, 'Animal type is required'],
    },

    title: {
      type: String,
      required: [true, 'Report title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },

    injuryType: {
      type: String,
      enum: [
        'injury',
        'accident',
        'illness',
        'abandoned',
        'trapped',
        'other',
      ],
      required: [true, 'Injury type is required'],
    },

    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      required: [true, 'Severity is required'],
    },

    photos: {
      type: [String],
      default: [],
    },

    location: {
      address: {
        type: String,
        trim: true,
        default: '',
      },

      latitude: {
        type: Number,
        required: [true, 'Latitude is required'],
      },

      longitude: {
        type: Number,
        required: [true, 'Longitude is required'],
      },

      // GeoJSON Point
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: function (value) {
            return (
              Array.isArray(value) &&
              value.length === 2
            )
          },
          message:
            'Coordinates must contain [longitude, latitude]',
        },
      },
    },

    contactPhone: {
      type: String,
      trim: true,
      default: '',
    },

    status: {
      type: String,
      enum: [
        'reported',
        'verified',
        'rescue_assigned',
        'in_treatment',
        'recovered',
        'closed',
      ],
      default: 'reported',
    },
  },
  {
    timestamps: true,
  }
)

// MongoDB geospatial index
animalReportSchema.index({
  'location.coordinates': '2dsphere',
})

module.exports = mongoose.model(
  'AnimalReport',
  animalReportSchema
)