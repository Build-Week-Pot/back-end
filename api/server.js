const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const userRouter = require("./users/user-router")

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/user', userRouter);

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });


module.exports = server
