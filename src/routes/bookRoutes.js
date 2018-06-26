const express = require('express');

const bookRouter = express.Router();

function router(nav){

    const books=[
        {
            title:"Little Prince",
            genere:"Fiction",
            author:"Antoine de Saint-Exupéry",
            read:false
        },
        {
            title:"Eat Pray Love",
            genere:"Memoir",
            author:"Elizabeth Gilbert",
            read:false
        },
        {
            title:"The Secret",
            genere:"Spirtuality",
            author:"Rhonda Byrne",
            read:false
        },
        {
            title:"Life of Pie",
            genere:"Fiction",
            author:"Yann Martel",
            read:false
        },
        {
            title:"The Book of the Dun Cow",
            genere:"Fantasy Fiction",
            author:"Walter Wangerin Jr.",
            read:false
        }    
    ]
    
    bookRouter.route('/')
        .get((req,res)=>{
            res.render('bookListView',{
                title:'My Library',
                nav,
                books
            })
        });
    
    bookRouter.route('/:id')
        .get((req,res)=>{
            const { id } = req.params;
            res.render('bookView',{
                title:'My Library',
                nav,
                book : books[id]
            })
    
        });
    
        return bookRouter;
}

module.exports = router;


