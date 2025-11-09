const { Lead, User, sequelize } = require('../models');

// @desc    Get dashboard analytics data
// @route   GET /api/dashboard
// @access  Private
exports.getDashboardData = async (req, res) => {
  try {
    const leadsByStatus = await Lead.findAll({
      group: ['status'],
      attributes: ['status', [sequelize.fn('COUNT', 'status'), 'count']],
    });

    const leadsByOwner = await Lead.findAll({
      group: ['owner.id', 'owner.name'],
      attributes: [[sequelize.fn('COUNT', 'owner.id'), 'count']],
      include: [{ model: User, as: 'owner', attributes: ['name'] }],
    });

    res.status(200).json({ leadsByStatus, leadsByOwner });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
};
