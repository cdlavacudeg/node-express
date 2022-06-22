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
mongosh "mongodb+srv://<CLUSTER>.mongodb.net/NoCountry31" --username <USERNAME>
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

## Data Explorer

### Commands

- `show dbs`: Show the databases in the connection.
- `use {database_name}`: Use the database.
- `show collections`: Show the collections in a database.
- `db.{collection_name}.find({"field":"value"})`: query the collection.
- `db.{collection_name}.find({"field":"value"}).count()`: query the collection and count the total documents.
- `it`: Iterates through a cursor(a pointer (direct address of the memory location) to a result set of a query).
- `db.{collection_name}.find({"field":"value"}).pretty()`: query the collection and format it.

## Creating and Manipulating documents

### Inserting New documents

- `db.{collection_name}.finOne()` : get a random document from the collection
- `db.{collection_name}.insert(document)` : insert a document on the collection
- `db.{collection_name}.insert([documents])`: insert more than one document, insert with an array of documents
- `db.{collection_name}.insert([documents],{"ordered":false})` : Insert the documents without order

Collections and databases are created when ther are being used.

### Updating Documents

- `updateOne()`: update only one document, the first it finds.
- `updateMany()`: update all of the documents that it finds.
- `db.{collection}.updateMany({query},{update_operator})`: update all documents of the query with the update operator.
  - `db.zips.updateMany({ "city": "HUDSON" }, { "$inc": { "pop": 10 } })`
- `db.{colection}.updateOne({query},{update_operator})`: update the document of the query with the update operator.
  - `db.zips.updateOne({ "zip": "12534" }, { "$set": { "pop": 17630 } })`
- **update operators**:
  - `{"$inc":{"<field1>":<increment value>,"<field2>":<increment value>}}` : increment to the field
  - `{"$set":{"<field1>":<updated value/new value>,<field1>":<updated value/new value>}` : set field value to a new
    specifie value.
  - `{"$push":{"<field1>":<value1>,"<field2>":<value2>}` : adds an element to an array field.

[Update Operators DOC](https://www.mongodb.com/docs/manual/reference/operator/update/#id1)

### Deleting Documents

- `deleteOne()` : delete only one document, the first it finds.
- `deleteMany()`: delete all of the documents that it finds.
- `db.{collection}.drop()` : delete collection
