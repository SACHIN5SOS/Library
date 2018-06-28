const { MongoClient, ObjectId } = require('mongodb');

function bookController(bookService,nav){
    function getIndex(req,res){
        const url = 'mongodb://localhost:27017';
        const dbname = 'libraryApp';
        (async function mongo(){
            let client;
            try{

                client = await MongoClient.connect(url);
                
                // console.log('connected to server');

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
    }

    function getById(req,res){
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

                book.details =await bookService.getBookById(book.bookId);

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

    }

    function middleware(req,res,next){
        if(req.user){
            next();
        }
        else{
            res.redirect('/');
        }
    }

    return {
        getIndex,
        getById,
        middleware

    }
}

module.exports = bookController;