
let express = require('express');
let router = express.Router();
var app = express();
const path = require('path');


router
    .use('/api/user',  require ('./api/user'))
    .use('/api/alumno',  require ('./api/alumno'))
    .use('/api/universidad',  require ('./api/universidad'))
    .use('/api/coordinador',  require ('./api/coordinador'))
    .use('/api/profesor',  require ('./api/profesor'))
    .use('/api/classroom',  require ('./api/classroom'))
    .use('/api/aula', require('./api/aula'))
    .use('/api/contenido', require('./api/contenido'))
    .use('/api/filter_universidad', require('./api/filter_universidad'))
    .use('/api/tareas', require('./api/tareas'))
    .use('/api/reports', require('./api/reports'))

module.exports = router;