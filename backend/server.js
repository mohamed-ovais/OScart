const app = require('./app');
const path = require('path');
const connectDatabase = require('./config/database');



connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`My server listening port:${process.env.PORT} in ${process.env.NODE_ENV}`);
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to the unhandled rejection');
    server.close(()=>{
        process.exit(1);
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to the uncatch rejection');
    server.close(()=>{
        process.exit(1);
    })
})

