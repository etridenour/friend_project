
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./models')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./routes/findFriends'));
console.log('fuck')


app.listen(3030);
