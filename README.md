# USING NODEJS AND MONGODB TO PERFORM BASIC CRUD OPERATIONS.

## Databases
Databases are used to store structured information. Databases support various operations on the data.
* Query
* Insert
* Update
* Delete

Databases include SQL(MYSQL, POSTGRES) and NoSQL (MongoDB) databases.

## NoSQL Databases
NoSQL databases address some challenges encountered with SQL databases. There are four broad categories:

* Document databases (e.g . MongoDB)
* Key-value databases (e.g. Redis)
* Column-family databases (e.g Cassandra)
* Graph databases (e.g. Neo4J)

## Document Databases

Document: A self-contained piece of information.

E.g, a JSON document: 
```
{
    |"title": "Harry Potter and the Goblet of Fire",
    "author": "J.K Rowling"
}
```
**Collection:** group of documents 

**Database: ** A set of collections

## MongoDB
MongoDB stores data in BSON(Binary JSON) format.
Every document in Mongo must have an **_id** field that is unique.
Default created by Mongo when you insert a document.

Example:
 ```
{
    "_id": "620a0a03753e3fb0eccfc3cd"
    "title": "Harry Potter and the Goblet of Fire"
    "author": "J.K Rowling",
}
```

**ObjectId** is a 12 byte field:
* Timestamp (4)
* Machine (3)
* Proc. ID (2)
* Increment (3)

## Setting up MongoDB

Download and install mongodb for your os. Go to : https://www.mongodb.com
Make use of the mongodb documentation for guidance.
* Verify if mongo is successfully installed by running the following command in terminal
`Mongo or mongod`
* Make sure your mongo service is running.
* Using db.help() gives you a set of commands you can use.

## Node and MongoDB

Node MongoDB Driver allows nodejs to interact with mongodb service.
The driver provides a high-level API for Node applications to interact with the mongodb server.

### Installation:
* Npm install mongodb –save
* Supports both callback based and promise based interactions.

## Performing crud operations using node and
mongodb

Every incoming request needs to be decoded to decide the nature of the request:
GET, PUT, POST, DELETE
* Resource affected
* Data in body of requested.
* Translate request to an equivalent database operation.

## Performing crud operations using node and mongodb

A demonstration of basic crud operations using nodejs with mongo database.
The books database was used to illustrate how the various crud operations are performed.
The source code for the demo can be found at :
https://github.com/NanorIsrael/Node-with-mongo-crud-demos

## Setting up the server
```
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json();
app.listen(5000, () => {
console.log('server running successfully')
})
```
## Connecting to the MongoDB database
```
const connect = mongoose.connect("mongodb://localhost:27017/books");
connect.then((db) =>{
console.log('connected to mongo server')
}, (error) => console.log(error))
```
## Post crud endpoint
```
const bookShema = mongoose.Schema({
title: String,
author: String
})

const Book = mongoose.model('Book', bookShema)

app.post('/book', (req, res) => {
Book.create(req.body)
.then((book) => {
res.status(201).json(book);
})
.catch(error => console.log(error))
});
```
## Get crud endpoints
```
app.get('/books', (req, res) => {
Book.find({})
.then(books => {
res.status(200).json(books);
})
.catch(error => console.log(error))
});
```
## Get by id crud endpoint
```
app.get('/book/:bookId', (req, res) => {
const {bookId} = req.params;
Book.findById(bookId)
.then(books => {
res.status(200).json(books);
})
.catch(error => console.log(error))
```
## Put crud endpoint
```
app.put('/book/:bookId', (req, res) => {
const {bookId} = req.params;
Book.findByIdAndUpdate(bookId, req.body)
.then(books => {
res.status(200).json(books);
})
.catch(error => console.log(error))
})
```
## Delete crud endpoint
```
app.delete('/book/:bookId', (req, res) => {
const {bookId} = req.params;
Book.findByIdAndDelete(bookId)
.then(books => {
res.status(200).json(books);
})
.catch(error => console.log(error))
```
