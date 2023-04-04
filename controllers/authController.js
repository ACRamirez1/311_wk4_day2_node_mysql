const mysql = require('mysql')
let db = require("../sql/connection");
let argon2 = require("argon2")
let jwt = require("jsonwebtoken")

let register = async(req, res) => {
// {"username": cramirez", "password": "bob12345", "fullName": "Chris Ramirez"}
    let username = req.body.username;
    let password = req.body.password;
    let fullName = req.body.fullName;

    let passwordHash;

    try {
        //hash the password
        passwordHash = await argon2.hash(password);

    } catch(err) {
        console.log(err);
        ////if err code = "ER_DUP_ENTRY"{
            //console.log('user name alreday taken, please choose another.', err)}
        res.sendStatus(500);
        return;
    }

    let params = [username, passwordHash, fullName]
    let sql = "insert into regUser (username, password_hash, full_name) values(?, ?, ?)"

    try {
    let results = await db.queryPromise(sql, params);
    res.sendStatus(200);
    }catch(err) {
        console.log(err);
        res.sendStatus(500);
        return;
    }


}


let login = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    let sql = "select id, full_name, password_hash from regUser where username = ?"
    let params = [username];

    db.query(sql, params, async (err, rows) => {
        if(err){
            console.log("could not get user", err)
            res.sendStatus(500);
        }else{
            //we found someone
            if(rows.length > 1) {
                console.log("Returned too many rows for username ", username)
                res.sendStatus(500);
            } else if (rows.length == 0) {
                console.log("Username does not exist. Please sign up for an account.")
            } else {
                // we have one row
                // it comes back as an array of objects, so you get the object by it's index
                //[ {"id": 234, "username": "cramirez", "password_hash": ".....", "full_name": "Chris Ramirez"} ]

                let pwHash = rows[0].password_hash;
                let fnName = rows[0].full_name;
                let userId = rows[0].id;

                let goodPass = false;

                try {
                    goodPass = await argon2.verify(pwHash, password);    // returns a boolean, so at this if the hash verified, goodPass = true
                } catch(err) {
                    console.log("Failed to verify password", err);
                    // res.status(400).send("Invalid password");
                }
                
                if(goodPass){
                    let token ={
                        "fullName": fnName,
                        "userId": userId   // usually want the bare minimum of key/value
                    }

                    // res.json(token);  // unsigned token  // JUST A TEST!!


                    // NOW WE NEED TO CREATE OUR SECRET

                    let signedToken = jwt.sign(token, process.env.JWT_SECRET)

                    res.json(signedToken)
                    res.sendStatus(200)

                    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkNocmlzIFJhbWlyZXoiLCJ1c2VySWQiOjEsImlhdCI6MTY4MDE5MTQ0N30.Jf1FfNPScMu3VnxDiJQB64EnjSNeXHJakIXiS70zMbg

                } else {
                    res.sendStatus(400)
                }

            } // end, else
        }
    })  // end db.query



} // end of login function




// const logout = (req, res) => {
//     console.log("Logging out");
//     if (req.session) {
//         req.session.destroy(err => {
//             if (err) {
//                 res.status(400).send('Unable to log out')
//             } else {
//                 res.send('Logout successful')
//             }
//         });
//     }else {
//         res.end()
//     }
// }

module.exports = {register, login}