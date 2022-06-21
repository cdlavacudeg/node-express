# MongoDB Database

MongoDb is a NoSQL document database

## What is a Document in MongoDB?

A way to organize and store data as a set of field-value pairs.

## Collection

An organized stare of documents in MongoDB, usually with common fields between documents.

## MongoDB Atlas

Database in the cloud.

- Database as a service.
- Clusters: A group of servers that stores your data.
- Replica set: a few connected MongoDB instances that store the same data.
- Instance: a single machine locally or in the cloud, running a certain software.

## Connect database

```
mongosh "mongodb+srv://nocountry31.4zumk.mongodb.net/NoCountry31" --username cdlavacudeg
```

## How does MongoDB store data?

- JSON: JavaScript Standard notation
  ```json
  {
    "field": "value",
    "field": "value"
  }
  ```
  MongoDB stores the data as BSON.
- BSON: Binary JSON, bridges the gap between binary representation and JSON format.
  - Optimized for:
    - Speed
    - Space
    - Flexibility
      High performance
      General-purpose focus

[JSON and BSON](https://www.mongodb.com/json-and-bson)
[More about BSON](http://bsonspec.org/)

## Importing and Exporting Data

- URI string: Uniform Resorce Identifier
- srv -n establish a secure connection
- target database

```shell
//export
mongodump --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"

mongoexport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --collection=sales --out=sales.json
//import
mongorestore --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"  --drop dump

mongoimport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --drop sales.json
```
