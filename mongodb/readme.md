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

## Advance CRUD operators:

### Query operators - Comparison

- **query operators**: Provide additional ways to locate data within the database `{<field>:{<operator>:<value>}}`
  - `{"$eq"}`: Equal to
  - `{"$ne"}`: Not equal to
  - `{"$gt"}`: Greater than >
  - `{"$lt"}`: Less than <
  - `{"$gte"}`: Greater Than or Equal to >=
  - `{"$lte"}`: Less Than or Equal to <=
- `db.trips.find({ "tripduration": { "$lte" : 70 }, "usertype": { "$ne": "Subscriber" } }).pretty()`

### Query operators - Logic

- `{<operator>:[{statement1},{statement2},...]}`
  - `{"$and"}`: Match all of the specified query clauses
  - `{"$or"}` : At least one of the query clouses is matched
  - `{"$nor}` : Fail to match both given clauses
  - `{"$not}` : Negates the query requirement
- **Implicit $and**:

  - `{"$and":[{"student_id":{"$gt":25}},{"student_id":{"$lt":100}}]}`
  - `{"student_id":{"$gt":25,"$lt":100}}`

```
   db.routes.find({ "$and": [ { "$or" :[ { "dst_airport": "KZN" },
                                       { "src_airport": "KZN" }
                                     ] },
                             { "$or" :[ { "airplane": "CR2" },
                                        { "airplane": "A81" } ] }
                            ]}).pretty()
```

```

    db.inspections.find({"$and":[
        {"result":{"$eq":"Out of Business"}},
        {"sector":{"$eq":"Home Improvoment Contractor - 100"}}
        ])
```

```
    db.companies.find({"$or":[{
            "$and":[{
                  "founded_year":2004
              },{
                  "$or":[{"category_code":"social"},{"category_code":"web"}]
                }]
          },{
            "$and":[{
                  "founded_month":10
            },{
                  "$or":[{"category_code":"social"},{"category_code":"web"}]
              }]
            }
          ]})
```

### Expressive Query operators

- `{"$exp"}` : allows the use of aggregation expressions withon the query language.`{$expe: {<expression>}}`
- **aggregation expressions**:
  - `$` denotes the use of an operator and addresses the field value to.
  - `{<operator>: {<field>,<value>}}` : Aggregation sintax

```
db.trips.find({ "$expr": { "$eq": [ "$end station id", "$start station id"] }
}).count()

```

```

db.trips.find({ "$expr": { "$and": [ { "$gt": [ "$tripduration", 1200 ]},
{ "$eq": [ "$end station id", "$start station id" ]}
]}}).count()

```

### Array Operators

- `{"$push"}`: add an element to an array; Turns a field into an array field if it was previusly a different type.
- `{"$all"}` : return all documents that have al least the elements in the query without order.
- `{"$size}` : query by the size of the array.
- `{"$elemMatch}`: Enter deep in the object

```
db.listingsAndReviews.find({ "amenities": {
"$size": 20,
                                  "$all": [ "Internet", "Wifi", "Kitchen",
"Heating", "Family/kid friendly",
"Washer", "Dryer", "Essentials",
"Shampoo", "Hangers",
"Hair dryer", "Iron",
"Laptop friendly workspace" ]
}
}).pretty()

```

```
db.listingsAndReviews.find({ "reviews": { "$size":50 },
                             "accommodates": { "$gt":6 }})
```

```
db.listingsAndReviews.find({"property_type":"House","amenities":{"$all":["Changing table"]}})
```

#### Projection
:
- Syntax: `db.{collection}.find({<query>},{<projection>})`: 1 Include the field, 0 exclude the field.

```
db.listingsAndReviews.find({ "amenities":
{ "$size": 20, "$all": [ "Internet", "Wifi", "Kitchen", "Heating",
"Family/kid friendly", "Washer", "Dryer",
"Essentials", "Shampoo", "Hangers",
"Hair dryer", "Iron",
"Laptop friendly workspace" ] } },
{"price": 1, "address": 1}).pretty()
```

```
db.listingsAndReviews.find({ "amenities": "Wifi" },
{ "price": 1, "address": 1, "\_id": 0 }).pretty()
```

```
db.grades.find({ "class_id": 431 },
{ "scores": { "$elemMatch": { "score": { "$gt": 85 } } }
}).pretty()

```

```
db.grades.find({ "scores": { "$elemMatch": { "type": "extra credit" } }
}).pretty()

```

```
db.companies.find({"offices":{"$elemMatch":{"city":"Seattle"}}}).count()

db.companies.find({ "funding_rounds": { "$size": 8 } },
                  { "name": 1, "_id": 0 })
```

## Array Operators and Sub-Documents

```
use sample_training

db.trips.findOne({ "start station location.type": "Point" })

db.companies.find({ "relationships.0.person.last_name": "Zuckerberg" },
                  { "name": 1 }).pretty()

db.companies.find({ "relationships.0.person.first_name": "Mark",
                    "relationships.0.title": { "$regex": "CEO" } },
                  { "name": 1 }).count()


db.companies.find({ "relationships.0.person.first_name": "Mark",
                    "relationships.0.title": {"$regex": "CEO" } },
                  { "name": 1 }).pretty()

db.companies.find({ "relationships":
                      { "$elemMatch": { "is_past": true,
                                        "person.first_name": "Mark" } } },
                  { "name": 1 }).pretty()

db.companies.find({ "relationships":
                      { "$elemMatch": { "is_past": true,
                                        "person.first_name": "Mark" } } },
                  { "name": 1 }).count()
```

```
db.trips.find({"start station location.coordinates.0":{"$lt":-74}}).count()
```

- [Query an Array](https://www.mongodb.com/docs/manual/tutorial/query-arrays/)
- [Regex](https://www.mongodb.com/docs/manual/reference/operator/query/regex/) 
