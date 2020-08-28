require('dotenv/config');
let express = require('express');
let path = require("path");
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let cors = require('cors');
let index = require('./routes/index');
let passport = require('passport');
let app = express();
const http = require('http');

let InitiateMongoServer = require('./config/db')

// PORT
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ "message": err.name + ": " + err.message });
  }
});

app.use("/", index)
InitiateMongoServer();

var server = require('http').Server(app);
let io = require('./controllers/socket.ctrl').initialize(server);


server.listen(PORT, function () {
  console.log('App is running on port '+ process.env.PORT + '!' );
});
