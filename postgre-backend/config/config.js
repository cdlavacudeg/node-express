require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.HOST_DB,
  dbPort: process.env.PORT_DB,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_KEY,
};

module.exports = { config };
