const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models'); // Import your Sequelize models

/**
 * Register a new user.
 * Assigns 'Sales Executive' role by default.
 */
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Basic name format validation
  const nameRegex = /^[a-zA-Z\s]*$/;
  if (!nameRegex.test(name)) {
    return res.status(400).json({ message: 'Name can only contain letters and spaces' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password_hash: passwordHash,
    });

    // Find the default role (e.g., 'Sales Executive')
    // This requires you to have seeded the Roles table!
    const defaultRole = await Role.findOne({ where: { name: 'Sales Executive' } });
    if (!defaultRole) {
      // This is a server error, the roles should exist
      console.error("Default 'Sales Executive' role not found. Please seed the database.");
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // Assign the default role to the new user
    await newUser.addRole(defaultRole);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Log in an existing user.
 * Returns a JWT with user ID and role.
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user by email, and include their assigned Roles
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        through: { attributes: [] }, // Don't include the junction table attributes
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user has a role assigned
    if (!user.Roles || user.Roles.length === 0) {
      console.error(`User ${user.email} has no role assigned.`);
      return res.status(401).json({ message: 'Login failed: No role assigned' });
    }

    // Get the first assigned role
    const userRole = user.Roles[0].name;

    // Create JWT
    const token = jwt.sign(
      { userId: user.id, role: userRole },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: userRole,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};