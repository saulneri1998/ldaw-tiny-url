// Imports
const express = require('express');
const webRoutes = require('./routes/web');

// Express app creation
const app = express();
const appConfig = require('./configs/app');

// parse user input
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// View engine configs
const exphbs = require('express-handlebars');
const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();
const extNameHbs = 'hbs';
const hbs = exphbs.create({
    extname: extNameHbs,
    helpers: multihelpers
});
app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);
// Receive parameters from the Form requests
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(__dirname + '/public'));
app.use('/', webRoutes);

// App init
app.listen(appConfig.expressPort, () => {
    console.log(`Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});