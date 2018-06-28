const axios = require('axios');
const xml2js = require('xml2js');

const parser = xml2js.Parser({ explicitArray:false });
function goodReadServices(){
    function getBookById(bookId){
        return new Promise((resolve,reject)=>{
            axios.get(`https://www.goodreads.com/book/isbn/${bookId}?key=MrnyhRAQFTRCRGX8SemfOQ`)
            .then((response)=>{
                parser.parseString(response.data,(err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        resolve(result.GoodreadsResponse.book);
                    }
                })
            })
            .catch((error)=>{
                reject(error);
                console.log(error);
            });

        });
    }

    return { getBookById }
}

module.exports = goodReadServices;

