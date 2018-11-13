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



app.listen(3030);
