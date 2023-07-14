//LOGICA DEL SERVIDOR.
const express = require('express'); 
// middelware.To see server http requests(PUT, POST, GET, DELETE). ej:GET /404 0.261 ms - 139
const morgan = require('morgan');
//to accept requests from other origins.
const cors = require('cors');


const app = express();
// process.env.PORT: if in the O.S. there is a port defined for this app, it uses that; if not, it uses the 3000 
app.set('port', process.env.PORT || 3000);

// Middleware
//app.use(cors({origin: http://localhost:4200})) if we want to allow connections only from this port (Angular).
app.use(cors());
app.use(morgan('dev'));
//so my app can parse json
app.use(express.json());

//so my app can parse urlencoded when data comes from html forms, for example.
//app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/records', require('./routes/records.routes'));

module.exports = app;