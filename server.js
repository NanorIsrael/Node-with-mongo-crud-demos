const express = require('express');
const mongoose = require('mongoose');
const app = express();

const connect = mongoose.connect("mongodb://localhost:27017/books");
connect.then((db) =>{
    console.log('connected to mongo server')
}, (error) => console.log(error))

app.use(express.json())

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
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "An error ocurred. try again after some time"});
    })

});

app.get('/books', (req, res) => {
    Book.find({})
    .then(books => {
        res.status(200).json(books);

    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "An error ocurred. try again after some time"});
    })
});

app.get('/book/:bookId', (req, res) => {
    const {bookId} = req.params;

    Book.findById(bookId)
    .then(books => {
        res.status(200).json(books);

    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "An error ocurred. try again after some time"});
    })
});

app.put('/book/:bookId', (req, res) => {
    const {bookId} = req.params;

    Book.findByIdAndUpdate(bookId, req.body)
    .then(books => {
        res.status(200).json(books);

    })
    .catch(error =>{
         console.log(error)
         res.status(500).json({message: "An error ocurred. try again after some time"});
        })
});

app.delete('/book/:bookId', (req, res) => {
    const {bookId} = req.params;

    Book.findByIdAndDelete(bookId)
    .then(books => {
        res.status(200).json(books);

    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "An error ocurred. try again after some time"})
    })
});

app.listen(5000, () => {
    console.log('server running successfully')
})