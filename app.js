
var express = require('express');
var path = require('path')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const connectection=require('./Utilities/database')
var app = express();
connectection();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const bodyParser=require('body-parser')
const cors=require('cors')
app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.use(cors({
    allowedHeaders:['Authorization','Content-Type'],
    // "preflightContinue":false
}))

app.use('/admin', indexRouter);
app.use('/user', usersRouter);

app.use(function(req, res, next) {
 res.send("<h1>Page Not Found</h1>")
});


module.exports = app;
