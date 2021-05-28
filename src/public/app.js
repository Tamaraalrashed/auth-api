'use strict';

const authorizeUrl = 'https://www.facebook.com/v10.0/dialog/oauth';
const options = {
    client_id: 517100576141220,
    redirect_uri: 'https://tamara-facebook-auth.herokuapp.com/oauth',
    state: 'some_random_string'
};


const queryString = Object.keys(options).map(key=>{
    return `${key}=${encodeURIComponent(options[key])}`
}).join('&');

console.log('query string', queryString);

const authUrl = `${authorizeUrl}?${queryString}`;
const a = document.getElementById('login');
a.setAttribute('href', authUrl);