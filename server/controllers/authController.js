const bcrypt = require('bcryptjs')
const User = require('../models/User')

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
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone ? phone.trim() : '',
      password: hashedPassword,
    })

    // Safe response — password is never returned
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
    console.error('Registration error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Unable to create account',
    })
  }
}

module.exports = {
  registerUser,
}