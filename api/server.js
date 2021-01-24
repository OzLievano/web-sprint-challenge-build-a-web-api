const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!
const actions = require('./actions/actions-router')
const projects = require('./projects/projects-router')

server.use(express.json())
server.use('/api/actions',actions);
server.use('/api/projects',projects)

server.get('/',(req,res)=>{
    res.send('<h1>Welcome to the Thunderdome</h1>');
})

module.exports = server;
