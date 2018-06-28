const express = require('express');
const { MongoClient } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();
function router(nav){
    authRouter.route('/signUp').post((req,res) => {
            const { username,password } = req.body;
            const url = 'mongodb://localhost:27017';
            const dbname = 'libraryApp';
            (async function addUser(){
                let client;
                try{
                    const client =await MongoClient.connect(url);
                    const db = client.db(dbname);
                    const col = db.collection('users');
                    const user = {username,password};
                    const result= await col.insertOne(user);
                    req.login(result.ops[0],()=>{
                        res.redirect('/auth/profile');
                    });
                }catch(e){
                    console.log(e);
                }
            }());
        });

    authRouter.route('/signIn')
        .get((req,res)=>{
            res.render('signin',{
                nav,
                title:'My Library'
            });

        })
        .post(passport.authenticate('local',{
            successRedirect: '/auth/profile',
            failureRedirect:'/'
        }));

    authRouter.route('/profile')
        .all((req,res,next)=>{
            if(req.user){
                next();
            }
            else{
                res.redirect('/');
            }
        })
        .get((req,res)=>{
            res.json(req.user);
        });
        return authRouter;
}

module.exports = router;