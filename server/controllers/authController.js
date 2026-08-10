const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// ==========================================
// REGISTER USER
// ==========================================

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
    } = req.body

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      })
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase()

    // Check if user already exists
    const existingUser = await User.findOne({
      email: normalizedEmail,
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists',
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      12
    )

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone ? phone.trim() : '',
      password: hashedPassword,
    })

    // Send safe user data
    return res.status(201).json({
      success: true,
      message: 'DOGGO account created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        role: user.role,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error(
      'Registration error:',
      error.message
    )

    return res.status(500).json({
      success: false,
      message: 'Unable to create account',
    })
  }
}

// ==========================================
// LOGIN USER
// ==========================================

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase()

    // Find user and explicitly include password
    const user = await User.findOne({
      email: normalizedEmail,
    }).select('+password')

    // User not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    )

    // Wrong password
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN || '7d',
      }
    )

    // Send login response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        role: user.role,
      },
    })
  } catch (error) {
    console.error(
      'Login error:',
      error.message
    )

    return res.status(500).json({
      success: false,
      message: 'Unable to login',
    })
  }
}

// ==========================================
// GET CURRENT USER
// ==========================================

const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        profileImage: req.user.profileImage,
        role: req.user.role,
        createdAt: req.user.createdAt,
      },
    })
  } catch (error) {
    console.error(
      'Get current user error:',
      error.message
    )

    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve user',
    })
  }
}

// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
}