const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking-appointment', 'root', 'H3lloworld!', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize