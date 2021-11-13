const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});


const port = 3000;
const config = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
}

const app = express();

app.use( async(req, res, next) => {
    try {
        global.connection = await mysql.createConnection(config);
        

        // global.connection.connect();

        // connection.query(`
        //     SHOW DATABASES;
        // ` ,  (err, res) => {
        //     if (err) { console.log('Connection failed!',err);
        //         }
        //     console.log('Connected to database!',res)
        // });

        console.log('Connected to database!');

        // connection.end()

        await next();
    } catch (err) {
        console.log('Database Connection failed!', err);
        res.status(500).send('Sorry, this server is down!');
    } 
}); 

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});