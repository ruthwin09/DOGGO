const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token missing',
      })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    const user = await User.findById(
      decoded.userId
    )

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User account no longer exists',
      })
    }

    req.user = user

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Authentication token expired',
      })
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token',
      })
    }

    console.error(
      'Authentication error:',
      error.message
    )

    return res.status(500).json({
      success: false,
      message: 'Authentication failed',
    })
  }
}

module.exports = {
  protect,
}