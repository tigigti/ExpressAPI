// Your custom middleware here
const config = require("./config");
const jwt = require("jsonwebtoken");

// Use this on Routes to verify a token with [bearer token] style
const verifyToken = (req, res, next) => {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        // Header exists and is in right format
        const token = authorization.split(" ")[1];
        try {
            const decoded = jwt.verify(token, config.SECRET);
            if (!decoded.id) {
                res.status(401).json("Token invalid");
                return;
            }
            // Everything is good, set in req object and pass on
            req.token = decoded;
            next();
        } catch (error) {
            // Signing went wrong
            console.log(error);
            res.status(401).json("Signing of Token went wrong");
        }
    } else {
        res.status(401).json("No Authorization Header supplied or wrong format");
    }
};
