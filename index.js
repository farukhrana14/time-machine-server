const express = require ('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.awwy2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('Error Code: 403 -- Access Forbidden')
    })


//Connection to Mongo DB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const productsCollection = client.db(`${process.env.DB_NAME}`).collection("products");

    // get all products 
    app.get('/allProducts', (req, res) => {
        productsCollection.find()
        .toArray((err, items) => {
            res.send(items)
        })
    })    




});

app.listen(port, () => {
    console.log(`Server is live at http://localhost:${port}`)
})


