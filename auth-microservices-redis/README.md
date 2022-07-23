# Autenticación, Microservicios y Redis

## MySQL

- `docker compose up -d`: Run the container

- To use the npm library mysql, create the user on the database with `mysql_native_password`:

```MySQL
CREATE USER 'new_user'@'%' IDENTIFIED WITH mysql_native_password BY '***';
GRANT USAGE ON *.* TO 'new_user'@'%';
GRANT ALL PRIVILEGES ON *.* TO 'new_user'@'%';
FLUSH PRIVILEGES;
```

- Create the database and some tables:

```MySQL
CREATE DATABASE node;
USE node;
```

- Go to phpmyadmin and create the database structure

```
Servidor: mysql(service name)
```

```
CREATE TABLE `node`.`user` (
  `id` VARCHAR(32) NOT NULL ,
  `username` VARCHAR(32) NOT NULL ,
  `name` VARCHAR(64) NOT NULL ,
  PRIMARY KEY (`id`(32))
) ENGINE = InnoDB;
```

## Gestión de microservicios con PM2

- [PM2](https://pm2.keymetrics.io/)

```bash
npm i -g pm2
pm2 logs
pm2 status
pm2 start api/index.js --name api-principal
pm2 start mysql/index.js --name api-mysql
pm2 start post/index.js --name api-post
```

## Microservicios en Vercel Now, serverless y seguridad

- [Vercel](https://vercel.com/)

```json
{
  "version": 2,
  "env": {
    "NODE_ENV": "production",
    "MYSQL_DB_HOST": "@mysql_db_host",
    "MYSQL_DB_PORT": "@mysql_db_port",
    "MYSQL_DB_USER": "@mysql_db_user",
    "MYSQL_DB_PASSWORD": "@mysql_db_password",
    "MYSQL_DATABASE": "@mysql_database",
    "MYSQL_SERVICE_HOST": "@mysql_service_host",
    "SENTRY_ID": "@sentry_id",
    "SENTRY_DNS": "@sentry_dns",
    "AUTH_JWT_SECRET": "@auth_jwt_token"
  },
  "builds": [
    {
      "src": "src/api/index.js",
      "use": "@now/node"
    },
    {
      "src": "src/microservices/mysql/index.js",
      "use": "@now/node"
    },
    {
      "src": "src/microservices/posts/index.js",
      "use": "@now/node"
    }
  ],
  "routes": [
    {
      "src": "/api/users(.*)",
      "dest": "src/api/index.js"
    },
    {
      "src": "/api/auth(.*)",
      "dest": "src/api/index.js"
    },
    {
      "src": "/api/posts(.*)",
      "dest": "src/microservices/posts/index.js"
    },
    {
      "src": "/api/mysql(.*)",
      "dest": "src/microservices/mysql/index.js"
    }
  ]
}
```

```
npm i -g now
now
now login
now dev
```

## Cache Redis

El Cache es una forma más rápida de servir contenido que ya conocemos.

- [Redis](https://redis.io/)
