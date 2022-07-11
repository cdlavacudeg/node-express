const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequilize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

setupModels(sequilize);

// sequilize.sync(); // Create the structure, read the models, it does relist(overwrite information), not good in production.

module.exports = sequilize;
