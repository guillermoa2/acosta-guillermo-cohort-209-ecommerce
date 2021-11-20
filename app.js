const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

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
app.use(express.json());

app.use( async(req, res, next) => {
    try {
        global.db = await mysql.createConnection(config);

        global.db.config.namedPlaceholders = true;
        

        // global.db.connect();

        // connection.query(`
        //     SHOW DATABASES;
        // ` ,  (err, res) => {
        //     if (err) { console.log('Connection failed!',err);
        //         }
        //     console.log('Connected to database!',res)
        // });

        console.log('Connected to database!');

        // connection.db()

        await next();
    } catch (err) {
        console.log('Database Connection failed!', err);
        res.status(500).send('Sorry, this server is down!');
    } 
}); 

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/user/register', async (req, res) => {
    console.log('req.body',req.body);

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);

    console.log('hashed', encryptedPassword);

    const [user] = await global.db.query(`
        INSERT INTO user (name, email, password)
        VALUES (:name, :email, :password )
    `, {
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword
    });

    console.log('user',user);

    res.status(200).json({message:`User ${req.body.email} created!`});
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});