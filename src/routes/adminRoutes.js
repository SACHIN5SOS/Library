const express = require('express');
const { MongoClient } = require('mongodb');   //Same as const MongoCLient = require('mongodb').MongoClient



const adminRouter = express.Router();

const books=[
    {
        title:"Little Prince",
        genere:"Fiction",
        author:"Antoine de Saint-Exupéry",
        bookId: 157993,
        read:false
    },
    {
        title:"Eat Pray Love",
        genere:"Memoir",
        author:"Elizabeth Gilbert",
        bookId:19501,
        read:false
    },
    {
        title:"The Secret",
        genere:"Spirtuality",
        author:"Rhonda Byrne",
        bookId:52529,
        read:false
    },
    {
        title:"Life of Pie",
        genere:"Fiction",
        author:"Yann Martel",
        bookId:4214,
        read:false
    },
    {
        title:"The Book of the Dun Cow",
        genere:"Fantasy Fiction",
        author:"Walter Wangerin Jr.",
        bookId:77721,
        read:false
    }    
]

function router(nav){
    adminRouter.route('/')
        .get((req,res)=>{
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            (async function mongo(){
                let client;
                try{
                    client = await MongoClient.connect(url);
                    console.log('Mongo Connected Successfully');
                    const db = client.db(dbName);
                    const response =  await db.collection('books').insertMany(books);
                    res.json(response);
                } catch(err)
                {
                    console.log(err);
                }
                client.close();
            }());
        });

    return adminRouter;
}

module.exports = router;