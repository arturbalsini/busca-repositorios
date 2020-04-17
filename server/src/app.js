const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const routes = require('./routes');
const mongodb_conn_module = require('./mongodbConnModule');

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use('/languages', routes)


var db = mongodb_conn_module.connect();

app.listen(process.env.PORT || 8081)
