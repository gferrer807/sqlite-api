const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {validateEmailAndTitle, validateIDIsPresent} = require('./src/helpers/inputValidations');
const booksController = require("./src/controllers/booksController.js");


const app = express();

app.use(cors());
app.use(bodyParser());


app.get('/seedDB', (req, res) => {
    let seedResponse = booksController.seedDB();
    res.send(seedResponse);
    
})

app.get('/request', (req, res) => {
    let {id} = req.body;
    let books = booksController.retrieveBooks(id);
    res.send(books);
})

app.post('/request', (req, res) => {
    let {email, title} = req.body;
    if (!validateEmailAndTitle(email, title)) {
        res.send('Error on inputs. Check that email and title are present and formatted correctly');
    }
    let requestedBook = booksController.requestBook(email, title);
    res.send(requestedBook);
})

app.delete('/request', (req, res) => {
    let {id} = req.body;
    if (!validateIDIsPresent(id)) {
        res.send('Please submit an id')
    }
    let deletedBook = booksController.deleteRequest(id);
    res.send(deletedBook);
})

app.listen(8080, () => {
    console.log('Listening')
})