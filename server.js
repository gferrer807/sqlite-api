const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {requestBook, createDB, seedDB, retrieveBooks, deleteRequest} = require('./sqlite3functions')

const app = express();

app.use(cors());
app.use(bodyParser());


app.get('/createDB', (req, res) => {
    createDB(res);
})

app.get('/seedDB', (req,res) => {
    seedDB(res);
})

app.get('/retrieve', (req, res) => {
    retrieveBooks(req,res);
})

app.post('/request', (req, res) => {
    requestBook(req, res);
})

app.delete('/request', (req, res) => {
    deleteRequest(req,res);
})

app.listen(8080, () => {
    console.log('Listening')
})