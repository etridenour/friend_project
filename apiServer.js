
const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes/findFriends'));
app.use(require('./routes/authentication/signup'));
app.use(require('./routes/authentication/signin'));



app.listen(3030);
