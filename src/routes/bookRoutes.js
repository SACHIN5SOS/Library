const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const bookRouter = express.Router();

function router(nav){
    bookRouter.route('/')
        .get((req,res)=>{
            const url = 'mongodb://localhost:27017';
            const dbname = 'libraryApp';
            (async function mongo(){
                let client;
                try{

                    client = await MongoClient.connect(url);
                    
                    console.log('connected to server');

                    const db = client.db(dbname);
                    
                    const col = await db.collection('books');
                    
                    const booksArray = await col.find().toArray();

                    res.render('bookListView',{
                        title:'My Library',
                        nav,
                        booksArray
                    });
                } catch(err)
                {
                    console.log(err);
                }
                client.close();
            }());
        });
    
    
    bookRouter.route('/:id')
        .get((req,res)=>{
            const { id } = req.params;
            const  url = 'mongodb://localhost:27017';
            const dbname = 'libraryApp';
            (async function mongo()
            {
                let client;
                try
                {
                    client = await MongoClient.connect(url);

                    const db = client.db(dbname);
                    const col = await db.collection('books');
                    
                    const book = await col.findOne({"_id": ObjectId(`${id}`)});
                    console.log(book);
                    res.render('bookView',{
                    title:'My Library',
                    nav,
                    book
                    });
                }
                catch(err)
                {
                    console.log(err);
                }

                client.close();
            }());

        });
    
        return bookRouter;
}

module.exports = router;


