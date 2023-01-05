const {Client} = require('pg')

const data = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Aditya@2004",
    database: "postgres"
})

module.exports = data

const connectuserd = require('./connection.js')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})

data.connect();







app.get('/users', (req, res)=>{
    data.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    data.end;
})

app.get('/usersInnerJoin', (req, res)=>{
    data.query(`SELECT * 
    FROM users 
    JOIN departments ON departments.id = users.department_id`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    data.end;
})


app.get('/usersLeftJoin', (req, res)=>{
    data.query(`SELECT * 
    FROM users 
    LEFT JOIN departments ON departments.id = users.department_id`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    data.end;
})


// // // app.get('/Trigger', (req, res)=>{
// // //     data.query(`CREATE OR REPLACE FUNCTION log_last_name_changes()
// // //     RETURNS TRIGGER 
// // //     LANGUAGE PLPGSQL
// // //     AS
// // //   $$
// // //   BEGIN
// // //       IF NEW.last_name <> OLD.last_name THEN
// // //            INSERT INTO employee_audits(employee_id,last_name,changed_on)
// // //            VALUES(OLD.id,OLD.last_name,now());
// // //       END IF;
  
// // //       RETURN NEW;
// // //   END;
// // //   $$`, (err, result)=>{
// // //         if(!err){
// // //             res.send(result.rows);
// // //         }
// // //     });
// // //     client.end;
// // // })




app.get('/usersRightJoin', (req, res)=>{
    data.query(`SELECT * 
    FROM "users" 
    RIGHT JOIN "departments" ON "departments"."id" = "users"."department_id"`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    data.end;
})





app.get('/usersfullJoin', (req, res)=>{
    data.query(`SELECT * 
                   FROM "users" 
                   FULL OUTER JOIN "departments" ON "departments"."id" = "users"."department_id"`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    data.end;
})




app.get('/count', (req, res)=>{
    data.query(`SELECT COUNT(*) AS "number of users" FROM "users"`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    data.end;
})



app.post("/insert", async (req, res) => {
    try{
    const {name, lname} = req.body;
    //This takes our description that we sent in and inserts into the todo table
    const newTodo = await data.query("INSERT INTO users (name,lname) VALUES ($1,$2) RETURNING *", [name,lname]);
    res.json(newTodo.rows[0]);
    } catch(error){
    console.log(error.message)
    }
    });






    
const fetchUsers = async (orderBy) => {
    const query = `SELECT * 
                   FROM "users"
                   ORDER BY $1 DESC`;
    try {
        //await data.connect();                                // gets connection
        const { rows } = await data.query(query, [orderBy]); // sends queries
        console.log(rows);
    } catch (error) {
        console.error(error.stack);
    } finally {
        await data.end();                                    // closes connection
    }
};

fetchUsers('id');







