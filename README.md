# MySQL + Express

311 Checkpoint 1

Here are the routes for my backend/express/mysql app:

 GET/users
    this will give you a list of all the user from the db with an id,
      first name, last name, address, city, country, county, state, 
      zip, phone1, phone 2, and email by joining the usersAddress and usersContact tables together with the users.

GET/user/:id
    this will give you a single user by id if they exist within the users.

  POST/users
    this will allow you to add an entry for a new user that will be assigned an id
    through auto incrementation, and return to you as long as you provide the first name, last name, address, city, county, state, zip, phone1, phone2, and email.  

  PUT/users/:id
    this will allow you to update a specific users first name and last name with the new information specified in the body of the request if the user exists. 

  DELETE/users/first_name
    this will allow you to delete a user from the database by specifying the first name in the body of the request.

    Test the routes in Postman.



// Code down below is a detailed statement for my own personal use.

## Setup

In MYSQL Workbench, connect to the database and run the  `initialized sql`.

## Updates to Code

1. Update package.json to use lateest version:
devDependencies
  nodemon
dependencies
  express
  mysql
  dotenv
add start and dev commands to scripts

2. npm start

3. create a .env file and add variables for your db creds 
  add to .gitignore
  add node_modules

4. create a public folder
    add index.html ! link the stylesheet and add h1 'It works.'
    add index.css

5. create an index.js 
  1st, require("express")
  2nd, require("path")
  create variable app = express()
  create port
  bring in app.use with express static for public file
  call app.use(express.json())
  get path for public file
  create a way for the app to listen on port

6. create a db/sql file inside of utils/sql 
  require("mysql")
  require("dotenv").config()
  create variable let connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
  }
); 
  add a connection.querySync for the async
  create variable for the promise
  create variable for the results
  create a connection.query to test to see if connection was made
  create module.exports = connection;

7. npm run dev
  this is so I can have the port running. 
  this will help me know if a mistake is made, then port will crash. 

8. create source folder
  create controller folder inside src
  create routes folder inside src
  create a utils/sql folder inside of src

9. Before I can start on controller or routes, I need to create my SCRUM statements, 
  connnect my controller to router, connect my router to my index.js, and then I need
  to make sure I have my variables created for my routes to be called and then used 
  so that all files are connected. 

9. create routes.js file inside routes
  require('express') in a varaible
  require('../controller/users') in a variable
  create variable for express.Router()

  create router for all CRUD request that connects the router to the controller
  export router using module.export = router

10. create controller/user.js file inside controller
  const mysql = require('mysql')
  const db = require('../sql/connection')
  
  GET/users
    this will give you a list of all the user from the db with an id,
      first name, last name, address, city, country, county, state, 
      zip, phone1, phone 2, and email by joining the usersAddress and usersContact tables together with the users.
        
        let sql ="select * from users u "
        sql += "join usersAddress ua on u.id = ua.user_id "
        sql += "join usersContact uc on u.id = uc.user_id"
    start you db.query to run the sql statement with an if statement that will either
    return the information or it will catch the error and return as 'error description'. 
  
  GET/user/:id
    this will give you a single user by id if they exist within the users.

      create variable let id = req.params.id;
      create variable let params = [id];
      add sql variable that is the same from users.
      add "and u.id = ?" to get a single user by theid id.
    start you db.query to run the sql statement with an if statement that will either
    return the information or it will catch the error and return 
    as 'getUsersById query failed.'.

  POST/users
    this will allow you to add an entry for a new user that will be assigned an id
    through auto incrementation, and return to you as long as you provide the first name, last name, address, city, county, state, zip, phone1, phone2, and email. 

      //Sync uses promises (async/await)
      //FIRST QUERY
      this POST function needs to run as an ASYNC function
        this needs to happen like this because I need to create a user first, before I can add their Contact and Address information into the table. 
      create variable let first = req.body.first_name;
      create variable let last = req.body.last_name;
      create variable for params that includes requested body variables
      create variable for sql statement
        let sql = "insert into users (first_name, last_name)
        values (?, ?)";
      create and unassigned varaible for results.
      assign the variable results to the try/catch function using 
        AWAIT expression with a db.querySync(sql, params). 
        
      create variable for id let id =  results.insertId;

      //SECOND QUERY
      create variables for body information of usersAddress
      create variable for params that includes requested body variables
      reassign sql variable for new statement
        sql = "insert into usersAddress (user_id, address, city, county, state, zip)
        values (?, ?, ?, ?, ?, ?)"
      reassign the results variable to this try/catch function using
        AWAIT expression with a db.querySync(sql, params). 

      //THIRD QUERY
      create variables for body information of usersContact
      create variable for params that includes requested body variables
      reassign sql variable for new statement
        sql = "insert into usersContact (user_id, phone1, phone2, email)
        values (?, ?, ?, ?)"
      reassign the results variable to this try/catch function using
        AWAIT expression with a db.querySync(sql, params). 

  PUT/users/:id
    this will allow you to update a specific users first name and last name with the new information specified in the body of the request if the user exists. 

      grab id from request.params.id
      create variables for body information that uses request
      create variables for params that includes requested body variables
      create sql variable for new statement
        let sql = "update users set first_name = ? last_name = ? where id = ?"
      use if statement to throw an error if !first name.      
      start you db.query to run the sql statement with an if statement that will either
      return the information or it will catch the error and return 
      as 'updateUserById query failed.'.

  DELETE/users/first_name
    this will allow you to delete a user from the database by specifying the first name in the body of the request

      create variable for first name with request.params.first_name
      create variable for params that includes requested body variables

      create sql variable for new statement
        let sql = "delete from users where first_name = ?"
      start you db.query to run the sql statement with an if statement that will either
      return the information or it will catch the error and return 
      as 'deleteUserByFirstName query failed.'

  export all controller functions inside of a module.export















```
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'admin'
```

These will be the same credentials we used to set up a connection in MySQL Workbench.

Finally, in MySQL Workbench, run the `initialize.sql` script that is included in this project.

## Overview

The routes/controllers and basic setup has been done for us. Our job is now to complete the queries in `controllers/users.js`. There are five different controller functions and the first one has been done for us. We should be able to see this by navigating to: http://localhost:4001/users/ 

Keep in mind that your port (4001) may be different.

Take another look in the `sql/connections.js` file and notice how we set up the class to pass the same connection pool to any file that requests it. 

Additionally, navigate to the `initialize.sql` file and look at the CREATEs for the three tables. Do we notice anything different this time around? How about the `ON DELETE CASCADE` line? Remember last time when we couldn't delete a row from the users table because the usersContact and usersAddress were still dependent on it? That no longer applies with CASCADE. Now when we delete something from the users table it will automatically be deleted from the other two tables based on the foreign key relationship. 

## Controller functions

### getAllUsers

This function is done for us. Notice the SQL statement retrieving all the rows from the users table.

### getUserById

The route is going to look like this: http://localhost:4001/users/389

Where 389 is the `:id` parameter in the route. Our job is to select just the row that matches that id and return it. Write a SELECT statement WHERE id = the req param id

Look at the following line where it says `mysql.format()`. What do you think goes in those brackets? Hint.. it's the req param id

### createUser

The route is going to look like this: http://localhost:4001/users/

We are going to need to use Postman to access this route since it is now a POST request. 

We are going to send a body with the request that looks like this:

```
{
  first_name: 'bogus',
  last_name: 'user'
}
```

Or any fake user of your choice. The goal is to take the request body and insert it into the database. You will write a query to INSERT INTO users (fields) VALUES ()

Again we will need to figure out what goes in the brackets

### updateUserById

The route is going to look like this: http://localhost:4001/users/234

Which is similar to the GET route but this time it is a PUT. We will need to use Postman again to make this work. 

The goal of this route is to again send a body and this time change the first_name and last_name fields for the row that matches that id. The body for this request will remain the same as last time: 

```
{
  first_name: 'bogus',
  last_name: 'user'
}
```

Write a SQL statement to UPDATE users SET fields = values WHERE id = req param id

### deleteUserByFirstName

This route will look like this: http://localhost:4001/users/bogus

But it will be using the DELETE protocol so again we will need to use Postman to achieve this.

Write a SQL statement to DELETE FROM users WHERE first_name = req param first_name

### Create a full Query

- In your `getAllUsers` return all fields of all users including the fields of `usersContact` & `usersAddress`
- In your `createUser` be sure that a complete user is created inluding all fields in `usersContact` & `usersAddress`

## Summary

If all went according to plan we now have a full CRUD API that selects, inserts, updates and deletes from a SQL database. Great job! Take the time to start expanding on these concepts. 
