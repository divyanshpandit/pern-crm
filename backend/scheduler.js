const cron = require('node-cron');
const { Activity, Sequelize } = require('./models'); // Import Sequelize for Op

const startScheduler = (io) => {
  cron.schedule('* * * * *', async () => { // Run every minute
    const now = new Date();
    const oneMinuteLater = new Date(now.getTime() + 60 * 1000);

    try {
      const upcomingActivities = await Activity.findAll({
        where: {
          scheduled_at: {
            [Sequelize.Op.between]: [now, oneMinuteLater],
          },
        },
      });

      upcomingActivities.forEach((activity) => {
        console.log(`Emitting scheduled activity: ${activity.content}`);
        io.emit('scheduled_activity', activity);
      });
    } catch (error) {
      console.error('Error in scheduler:', error);
    }
  });
};

module.exports = startScheduler;
