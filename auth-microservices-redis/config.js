module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  post: {
    port: process.env.POST_PORT || 3002,
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
  cacheService: {
    host: process.env.CHACHE_SRV_HOST || "lolahost",
    port: process.env.CACHE_SRV_PORT || 3003,
  },
  redis: {
    host: process.env.REDIS_HOST || "redishost-lab",
    port: process.env.REDIS_PORT || 13556,
    password: process.env.REDIS_PASS || "9aeuatoehuF",
  },
};
