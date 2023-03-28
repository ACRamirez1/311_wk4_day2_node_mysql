const mysql = require("mysql");
require("dotenv").config();


let connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
  }
);

connection.connect();

//basic promise wrapper if you want to just convert a callback to a promise
connection.queryPromise = (sql, params) => {
  return new Promise ( (reslove, reject) => {
    connection.query(sql, params, (err, rows) => {
      if (err){
        reject(err);
      } else {
        reslove(rows);
      }
    })
  })
};


// go farther and process the results of the promies and return the results
// helper function middleware instead of installing and learning another promise module
connection.querySync = async (sql, params) => {
  let promise = new Promise ( (resolve, reject) => {
    console.log("Executing query: ", sql);
    connection.query(sql, params, (err, results) => {
    if (err) {
      console.log("rejecting");
      return reject(err);
    } else {
      console.log("resolving");
      return resolve(results);
    }
  })
})
let results = await promise.then ( (results) =>{
  console.log("results ", results)
  return results;
}).catch( (err) => {
  throw err;
})
return results;

}




//test to see if the connection was made
connection.query("select now()", (err,rows) => {
  if(err) {
    console.log("not connected", err);
  } else {
    console.log("connected", rows)
  }
});

module.exports = connection;

// class Connection {
//   constructor() {
//     if (!this.pool) {
//       console.log("creating connection...");
//       this.pool = mysql.createPool({
//         connectionLimit: 100,
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PWD,
//         database: process.env.DB_NAME,
//       });

//       return this.pool;
//     }

//     return this.pool;
//   }
// }

// const instance = new Connection();

// module.exports = instance;
