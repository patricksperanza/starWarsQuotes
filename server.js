const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient



MongoClient.connect('mongodb+srv://patricksperanza:Pat&020191@cluster0.7e4ie0h.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({extended: true}))

    app.listen(3000, function(){
        console.log('listening on 3000')
    })

    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
            .then(results => {
                res.render('index.ejs', { quotes: results})
            })
            .catch()
    })

    app.post(('/quotes'), (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })
  })
  .catch(error => console.error(error))
  


