const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require("path")

if (process.env.NODE_ENV == 'development') { 
    require('dotenv').config() 
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes/newFriend'));
app.use(require('./routes/employees'));
app.use(require('./routes/privilegeChange'));
app.use(require('./routes/deleteEmployee'));
app.use(require('./routes/authentication/signup'));
app.use(require('./routes/authentication/signin'));
app.use(require('./routes/authentication/authenticate'));
app.use(require('./routes/authentication/changeProfile'));


if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () { console.log("\n\nlistening for requests on port " + PORT + "\n\n") })
