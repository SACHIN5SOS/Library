const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT|| 5000;

//Importing Routes
const nav = [            
    {name:'Books',link: '/books'},
    {name:'Authors',link:'/authors'}
]

const bookRouter = require('./src/routes/bookRoutes')(nav);

//Middleware for Morgan
app.use(morgan('tiny'));


//Middleware for static folders in Public
app.use(express.static(path.join(__dirname, '/public')));
app.set('views','./src/views');
app.set('view engine','ejs');


///BOOKS ROUTE
app.use('/books',bookRouter);

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
