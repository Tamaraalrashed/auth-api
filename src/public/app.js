'use strict';
// https://www.facebook.com/v10.0/dialog/oauth?
// client_id={app-id}
// &redirect_uri={redirect-uri}

// scope=email




const authorizeUrl = 'https://www.facebook.com/v10.0/dialog/oauth';
const options = {
    client_id: 517100576141220,
    redirect_uri: 'http://localhost:3000/oauth',
    state: 'some_random_string'
};


const queryString = Object.keys(options).map(key=>{
    return `${key}=${encodeURIComponent(options[key])}`
}).join('&');

console.log('query string', queryString);

const authUrl = `${authorizeUrl}?${queryString}`;
const a = document.getElementById('login');
a.setAttribute('href', authUrl);