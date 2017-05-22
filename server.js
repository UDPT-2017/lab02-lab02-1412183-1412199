const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const pg = require('pg');

var app = express();
var config = require('./DBconfig/config');
var pool = new pg.Pool(config);
var session;

app.set('view engine', 'pug');
app.set('views', __dirname + '/views')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessions({
    secret: '2u3h12u',
    resave: false,
    saveUninitialized: true
}))

var urlencodedParser = bodyParser.urlencoded({extended: false});
var control = require('./controllers');


app.get('/', control.login);
app.post('/', control.login_post);
app.get('/home', control.home);
app.get('/messageReceived', control.messageReceived);
app.get('/messageSent', control.messageSent);
app.get('/messageNew', control.messageNew);
app.post('/messageNew', urlencodedParser, control.message_post);
app.get('/friend', control.friend);
app.get('/users', control.user);
app.get('/about', control.about);
app.get('/login', control.login);
app.post('/login', urlencodedParser, control.login_post);
app.get('/signup', control.sigup);
app.post('/signup', urlencodedParser, control.sigup_post);

var port = 9090;
app.listen(port, function() {
    console.log('server started on port ' + port);
});
