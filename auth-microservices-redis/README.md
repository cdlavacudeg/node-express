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
