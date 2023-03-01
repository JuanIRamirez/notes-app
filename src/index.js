const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
//const exphbs = require('handlebars');
const methOverr = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

require('colors');

// Initializations.
const app = express();
const db = require('./database');
require('./config/passport');

//Settings
app.set('port', process.env.PORT | 3000);
app.set('views', path.join(__dirname, 'views'));

// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.engine('.hbs', handlebars({
//     defaultLayout: 'main',
//     layoutsDir: path.join(app.get('views'), 'layouts'),
//     partialsDir: path.join(app.get('views'), 'partials'),
//     extname: '.hbs'
// }))
// app.set('view engine', '.hbs');

// Create `ExpressHandlebars` instance with a default layout.
// https://stackoverflow.com/questions/26871522/how-to-change-default-layout-in-express-using-handlebars
var hbs = exphbs.create({
    defaultLayout: 'main',
    //helpers    : helpers,
    layoutsDir   : path.join(app.get('views'), 'layouts'),
    partialsDir  : path.join(app.get('views'), 'partials'),
    extname      : '.hbs'
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// MiddleWares
app.use(express.urlencoded({extended: false}));
app.use(methOverr('_method'));
app.use(session({
    secret: 'palabraSecreta',
    resave: true,
    saveUninitalized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    //res.locals.authenticated = !req.user.anonymous
    next();
})

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files
app.use(express.static( path.join(__dirname, 'public')));

// Server is Listening
app.listen(app.get('port'), () => {
    console.log('Server on port'.cyan.bold, app.get('port'));
    console.log('Starting at: ', Date.now().toString());
    //console.log('Layouts: ', path.join(app.get('views'), 'layouts'))
    //console.log(exphbs.defaultLayout)
});
