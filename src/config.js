require('dotenv').config();

module.exports = {
    appConfig: {
        host: process.env.HOST,
        port: process.env.PORT,
        secret: process.env.SECRET
    },
    dbConfig: {
        user: process.env.DBUSER,
        pass: process.env.DBPASS,
        name: process.env.DBNAME,
    }
};