const 
    express = require('express'),
    expressHandlebars = require('express-handlebars'),
    path = require('path');
require('dotenv').config();

const app = express();

app.locals.config = {
    googleMapsAPIKEY: process.env.googleMapsAPIKEY,

    fbAPIKEY: process.env.firebaseAPIKEY,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId 
}

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}));
app.set('view engine','handlebars');
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (request, response) => {
    response.render('index');
});

/* PORT */
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log("Server started at PORT: " + PORT);
})