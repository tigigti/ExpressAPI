// Declare your config variables here
// You can also do conditional declarations based on environment for example
// if(process.env.NODE_ENV=="production"){...}

require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    SECRET: process.env.SECRET
};
