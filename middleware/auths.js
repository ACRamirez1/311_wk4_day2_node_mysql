let jwt = require("jsonwebtoken")

let checkJWT = (req, res, next) => {

    let headerValue = req.get("Authorization")  // this is got from the bearer token when you plug in your long password_hash into the token portion. 
    let signedToken;

    if(headerValue){
        // Bearer dlfkjsdf
        let parts = headerValue.split(" ");
        signedToken = parts[1];
    }

    if(!signedToken){
        console.log("Missing signed token");
        res.sendStatus(403)
        return;
    }
        // if I get to this line, verify the secret

        try {
            let unsigned = jwt.verify(signedToken, process.env.JWT_SECRET)
            req.userInfo = unsigned;
        } catch (err) {
            console.log("Failed to verify token ", err);
            res.sendStatus(403);
            return;
        }


        // if we get here, it's a valid token, so go to the next task in the chain

        next();
    


}

module.exports = {checkJWT}