// Controller import the corresponding model
// and assign http routes to functions of that object

const authRouter = require("express").Router();
const auth = require("../models/auth");

authRouter.post("/", async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const result = await auth.createUser(email, username, password);
        if (result.failed) {
            res.status(400).json(result);
            return;
        }
        res.json("User created successfully");
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await auth.logIn(email, password);
        if (result.failed) {
            res.status(200).json(result);
            return;
        }
        res.json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

module.exports = authRouter;
