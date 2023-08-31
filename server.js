require("dotenv").config();
const http = require('http')
const app = require('./app')
let port = process.env.PORT || 3000;
const fs = require('fs');
const migrations = require("./migrations");

const server = http.createServer(app)

const startServer = async () => {
    await migrations.migrate();

}
startServer();

server.listen(port, async () => { 
    // if (process.env.ENV === 'production') {
    //     try {
    //         const secretsString = await retrieveSecrets();
    //         await fs.writeFile(".env", secretsString);
    //         dotenv.config();
    //         port = process.env.PORT || 80;
    //         console.log("server is running on port " + port);
    //     }
    //     catch (error) {
    //         console.log("Error in setting environment variables", error);
    //         process.exit(-1); 
    //     }
    // }
    console.log("server is running on port" +  port);

});

module.exports = server;