const express = require('express');

const indexRouter = express.Router();

function router(nav){
    indexRouter.use((req,res,next)=>{
        if(req.user){
            res.redirect('/books');
            
        }
        else{
            next();
        }
    })

    indexRouter.route('/')
    .get((req,res)=>{
        res.render('index',{
            title: 'My Library',
            nav
        });
    });

    return indexRouter;
    
}

module.exports = router;