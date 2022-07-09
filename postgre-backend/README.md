# Backend with Node.js and PostgreSQL

## Install Docker Engine on Ubuntu

- [Docker docs](https://docs.docker.com/engine/install/ubuntu/)

## Configuration of docker for postgreSQL

- [Docker Hub PostgreSQL](https://hub.docker.com/_/postgres)
- [Clean restart of a Docker
  Instance](https://docs.tibco.com/pub/mash-local/4.3.0/doc/html/docker/GUID-BD850566-5B79-4915-987E-430FC38DAAE4.html)
- [Docker mount](https://faun.pub/postgresql-in-docker-mount-volume-3220fbd0afc4)
- create `docker-compose.yml`
- volumes -> persist data
- run in terminal `docker-compose up -d {name_service:postgres}`:

```
docker compose up
docker compose --env-file [dir_name] up
```

- verify it is running `docker compose ps`
- shut the server down `doker compose down`

## Access to the postgreSQL image

- **Terminal**:

  - `docker compose exec {name_service: postgres} bash`
  - `psql -h localhost -d postgres -U postgres`

- **UI**:
  - start the pgadmin service, go to localhost
  - Go Object, create server and connect to the database
  - `docker ps`
  - `docker inspect {container_id}`: Details of the container

## PostgreSQL

- [PostgreSQL Cheat Sheet](https://postgrescheatsheet.com/#/tables)
- `\d+` Estructura de la base de datos
- `\q` Salir de la base de datos
- `exit` Salir del contenedor

```
CREATE TABLE task (
	id serial PRIMARY KEY,
	title VARCHAR ( 250 ) NOT NULL,
	completed boolean DEFAULT false
);
```

## Node-Postgres Integration

- `npm i pg`
- `npm i dotenv`

## ORM (Object Relational Model)

- [Sequelize](https://sequelize.org/docs/v6/getting-started/)
