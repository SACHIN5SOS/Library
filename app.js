const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT|| 5000;
//Middleware for body parser
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));



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
const authRouter = require('./src/routes/authRoutes')();


///BOOKS ROUTE
app.use('/books',bookRouter);
app.use('/admin',adminRouter);
app.use('/auth',authRouter);

//Index page Route
app.get('/',(req,res)=>{
    res.render('index',{
        title: 'My Library',
        nav
    });
});

//app listen
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else
    debug(chalk.magenta(`Starting server at ${port}`));
});
