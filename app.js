const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const app = express();
const port = process.env.PORT|| 5000;
//Middleware for body parser
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//Middleware for cookieParser and Session
app.use(cookieParser());
app.use(session({ 
    secret : 'library',
    resave: false,
    saveUninitialized: true
}));

//Middleware for passport in other folder
require('./src/config/passport.js')(app);


const path = require('path');

//Middleware for static folders in Public
app.use(express.static(path.join(__dirname, '/public')));
app.set('views','./src/views');
app.set('view engine','ejs');


//Importing Routes
const nav = [            
    {name:'Books',link: '/books'},
    {name:'Authors',link:'/authors'}
]




const adminRouter = require('./src/routes/adminRoutes')(nav);
const bookRouter = require('./src/routes/bookRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);
const indexRouter = require('./src/routes/indexRoutes')(nav);

///BOOKS ROUTE
app.use('/books',bookRouter);
app.use('/admin',adminRouter);
app.use('/auth',authRouter);
app.use('/',indexRouter);

//Index page Route


//app listen
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else
    debug(chalk.magenta(`Starting server at ${port}`));
});
