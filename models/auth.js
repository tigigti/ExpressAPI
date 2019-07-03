// Models execute queries on MySQL and return promises
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const auth = {};

auth.createUser = (email, username, password) => {
    return new Promise(async (resolve, reject) => {
        const sql = "INSERT INTO user (email,username,password) VALUES (?,?,?)";
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(sql, [email, username, hashedPassword], (err, res) => {
            if (err && err.code !== "ER_DUP_ENTRY") {
                reject(err);
            } else if (err) {
                resolve({ failed: true, text: "Email exists" });
            }
            resolve(res);
        });
    });
};

auth.logIn = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM user WHERE email=?";
        db.query(sql, email, async (err, res) => {
            if (err) reject(err);
            if (res.length === 0) {
                resolve({ failed: true, text: "User not found" });
                return;
            }
            // User found, check password here
            const match = await bcrypt.compare(password, res[0].password);
            if (match) {
                // Password correct, create jwt
                const token = jwt.sign(
                    {
                        id: res[0].id,
                        username: res[0].username
                    },
                    config.SECRET
                );
                resolve({
                    token,
                    username: res[0].username,
                    id: res[0].id
                });
                return;
            }
            resolve({ failed: true, text: "Wrong password" });
        });
    });
};
module.exports = auth;
