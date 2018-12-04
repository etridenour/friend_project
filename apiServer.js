const express = require('express')
const app = express()
const bodyParser = require('body-parser')


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

app.use('/static', express.static(path.join(__dirname, 'client', 'public')))

if(process.env.NODE_ENV === "production"){
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'public', 'index.html')))
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () { console.log("\n\n===== listening for requests on port " + PORT + " =====\n\n") })
