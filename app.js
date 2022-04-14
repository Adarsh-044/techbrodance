const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;
// post ka data ko readable format me lane ke liye. 
const bodyparser = require('body-parser');


const mongoose = require('mongoose');
// Database name is contactDance
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });



const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    address: String,
    phone: String,
    email: String,
    concern: String
});


const contact = mongoose.model('Contact', contactSchema);

// It provide the static file to the client
app.use('/static', express.static('static'));
app.use(express.urlencoded());


// get - post == express. .
// Using node..
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));



app.get("/", (req, res) => {
    const param = {}
    res.render('home.pug', param);
});

app.get("/contact", (req, res) => {
    const param = {}
    res.render('contact.pug', param);
});

// After the installation of mongoose
app.post("/contact", (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database")
    });

    // res.render('contact.pug');
});

// using express 
app.listen(port, (req, res) => {
    console.log(`http://localhost:5000/`);
});