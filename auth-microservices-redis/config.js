module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "notasecret",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "cristian",
    password: process.env.MYSQL_PASS || "123456",
    database: process.env.MYSQL_DB || "node",
    port: process.env.MYSQL_PORT || 3306,
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || "localhost",
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
};
