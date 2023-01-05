

// const {Client} = require('pg')

// const data = new Client({
//     host: "localhost",
//     user: "postgres",
//     port: 5432,
//     password: "Aditya@2004",
//     database: "postgres"
// })

// module.exports = data

// const client = require('./connection.js')
// const express = require('express');
// const app = express();
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

// app.listen(3300, ()=>{
//     console.log("Sever is now listening at port 3300");
// })

// client.connect();



// const insertUser = async (userName, userlname) => {
//     try {
//         await client.connect();           // gets connection
//         await client.query(
//             `INSERT INTO "users" ("name", "lname")  
//              VALUES ($1, $2)`, [userName, userlname]); // sends queries
//         return true;
//     } catch (error) {
//         console.error(error.stack);
//         return false;
//     } finally {
//         await client.end();               // closes connection
//     }
// };

// insertUser('Matt', 'moderator').then(result => {
//     if (result) {
//         console.log('User inserted');
//     }
// });
