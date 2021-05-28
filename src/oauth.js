'use strict';
require('dotenv').config();
const superagent = require('superagent');
const User = require('./models/users.js');




const facebookLoginUrl = 'https://graph.facebook.com/v10.0/oauth/access_token';
const remoteAPI = 'https://graph.facebook.com/me';
const REDIRECT_URI='https://tamara-facebook-auth.herokuapp.com/oauth'


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;



module.exports= async (req,res,next)=>{
    try {
        const code=req.query.code;
        const remoteToken=await exchangeCode(code);
        const remoteUser=await getRemoteUserInfo(remoteToken);
        const [user, token]=await getUser(remoteUser);
console.log('after save to db',user, token)
req.user=user;
req.token=token;
next();
        
    } catch (error) {
       next(error.message); 
    }
}

async function exchangeCode(code){
const tokenResponse =await superagent.get(facebookLoginUrl).query({
    code : code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI
})
const accessToken=tokenResponse.body.access_token;
return accessToken;
}

async function getRemoteUserInfo(token){
    const userResponse=await superagent.get(remoteAPI)
    .set('Authorization', `Bearer ${token}`)
    .set('Accept', 'application/json');
   
const user=userResponse.body;
    console.log('user info provided by facebook', user);
    return user;
}   


async function getUser(remoteUser) {
    const user = {
        username: remoteUser.name,
        password: '11111',
    };

    const userObj = new User(user);
    const userDoc = await userObj.save();

    const token = userDoc.token;
    return [userDoc, token];
}