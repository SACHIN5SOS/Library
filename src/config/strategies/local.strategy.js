const passport  = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');


module.exports = function localStrategy(){
    passport.use(new Strategy({
        usernameField:'username',
        passwordField: 'password'
    },(username,password,done)=>{
        const url ='mongodb://localhost:27017';
        const dbname = 'libraryApp';
        (async function mongo(){
            let client;
            try{
                client =await MongoClient.connect(url);
                const db = client.db(dbname);
                const col = db.collection('users');
                const user = await col.findOne({username});
                if(user.password===password){
                    done(null,user);
                }
                else{
                    done(null,false);
                }
            }catch(err){
                console.log(err);
            }
        }())
    }));
}