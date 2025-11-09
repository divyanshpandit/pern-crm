const { Lead, User, Activity } = require('../models');

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Private
exports.createLead = async (req, res) => {
  const { name, email, phone, status } = req.body;
  const owner_id = req.user.userId; // Assuming user ID is stored in req.user

  try {
    const lead = await Lead.create({
      name,
      email,
      phone,
      status,
      owner_id,
    });

    // Create an activity for lead creation
    await Activity.create({
      type: 'creation',
      content: `Lead created with status: ${status}`,
      lead_id: lead.id,
      user_id: owner_id,
    });

    req.io.emit('lead_created', lead);
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Error creating lead', error: error.message });
  }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll({ include: { model: User, as: 'owner', attributes: ['name', 'email'] } });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leads', error: error.message });
  }
};

// @desc    Get a single lead by ID
// @route   GET /api/leads/:id
// @access  Private
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id, { include: { model: User, as: 'owner', attributes: ['name', 'email'] } });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lead', error: error.message });
  }
};

// @desc    Update a lead
// @route   PUT /api/leads/:id
// @access  Private
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    const user = req.user;
    if (
      user.role !== 'Admin' &&
      user.role !== 'Manager' &&
      (user.role === 'Sales Executive' && lead.owner_id !== user.userId)
    ) {
      return res.status(403).json({ message: 'You do not have permission to edit this lead' });
    }

    const oldStatus = lead.status;
    const [updated] = await Lead.update(req.body, { where: { id: req.params.id } });

    if (updated) {
      const updatedLead = await Lead.findByPk(req.params.id);
      const newStatus = updatedLead.status;

      if (oldStatus !== newStatus) {
        await Activity.create({
          type: 'status_change',
          content: `Status changed from ${oldStatus} to ${newStatus}`,
          lead_id: updatedLead.id,
          user_id: req.user.userId,
        });
      }

      req.io.emit('lead_updated', updatedLead);
      res.status(200).json(updatedLead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating lead', error: error.message });
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    const user = req.user;
    if (user.role !== 'Admin') {
      return res.status(403).json({ message: 'You do not have permission to delete this lead' });
    }

    const deleted = await Lead.destroy({ where: { id: req.params.id } });
    if (deleted) {
      req.io.emit('lead_deleted', req.params.id);
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lead', error: error.message });
  }
};
