const { Activity } = require('../models');

// @desc    Create a new activity for a lead
// @route   POST /api/activities
// @access  Private
exports.createActivity = async (req, res) => {
  const { type, content, lead_id, scheduled_at } = req.body;
  const user_id = req.user.userId;

  try {
    const activity = await Activity.create({
      type,
      content,
      lead_id,
      user_id,
      scheduled_at: scheduled_at || null,
    });
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error creating activity', error: error.message });
  }
};

// @desc    Get all activities for a lead
// @route   GET /api/activities/:lead_id
// @access  Private
exports.getActivitiesForLead = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      where: { lead_id: req.params.lead_id },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error: error.message });
  }
};
