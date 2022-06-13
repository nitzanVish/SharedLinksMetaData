const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/mysql_connection')
const auth = require('./middleware/auth')

const app = express()
const port = 3005

//  Body Parser Middleware
app.use(bodyParser.json());

// Allow Origins Middleware
app.use(cors({
    credentials: true,
    origin: '*',
}));

// Connected to DB
db.init()

//  Auth Middleware
app.use(auth)

//Api routes
require('./routes')(app);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Example app listening on port ${port}`)
  })