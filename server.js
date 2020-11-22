const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {validateEmailAndTitle, validateIDIsPresent} = require('./controllers/inputValidations');
const {deleteRequest} = require('./controllers/deleteRequestBooks');
const {retrieveBooks} = require('./controllers/getRequestBooks');
const {requestBook } = require('./controllers/postRequestBooks');
const {createDB} = require('./controllers/setupDB');

const app = express();

app.use(cors());
app.use(bodyParser());


app.get('/createDB', (req, res) => {
    let seedResponse = createDB();
    res.send(seedResponse);
    
})

app.get('/request', (req, res) => {
    let {id} = req.body;
    let books = retrieveBooks(id);
    res.send(books);
})

app.post('/request', (req, res) => {
    let {email, title} = req.body;
    if (!validateEmailAndTitle(email, title)) {
        res.send('Error on inputs. Check that email and title are present and formatted correctly');
    }
    let requestedBook = requestBook(email, title);
    res.send(requestedBook);
})

app.delete('/request', (req, res) => {
    let {id} = req.body;
    if (!validateIDIsPresent(id)) {
        res.send('Please submit an id')
    }
    let deletedBook = deleteRequest(id);
    res.send(deletedBook);
})

app.listen(8080, () => {
    console.log('Listening')
})