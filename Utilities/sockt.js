
const express = require('express');
const http = require('http');
const app = express();
const socketio = require('socket.io');


const ServerHere = http.createServer(app);

const io = new socketio.Server(ServerHere,
    {
        cors: {
            origin: process.env.FORNT_END_URL,
        }
    }
);
module.exports = { io, app, ServerHere, express };