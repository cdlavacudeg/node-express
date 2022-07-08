# Backend with Node.js and PostgreSQL

## Install Docker Engine on Ubuntu

- [Docker docs](https://docs.docker.com/engine/install/ubuntu/) 

## Configuration of docker for postgreSQL

- [Docker Hub PostgreSQL](https://hub.docker.com/_/postgres) 

- create `docker-compose.yml`
- volumes -> persist data
- run in terminal `docker-compose up -d {name_service:postgres}`:
```
docker compose up
docker compose --env-file [dir_name] up
```
- verify it is running `docker compose ps`
- shut the server down `doker compose down`
