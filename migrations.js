require('dotenv').config();
//restaurants
const { exec } = require('child_process');
module.exports = {
    migrate: () => {
        exec(`node_modules/sequelize-cli/lib/sequelize db:migrate --env ${process.env.NODE_ENV}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`${stdout}`);
            }
            console.log(`${stdout}`);
            console.warn(`${stderr}`);
        });
    },
    migrateRollback: () => {
        exec(`node_modules/sequelize-cli/lib/sequelize db:migrate:undo --env ${process.env.NODE_ENV}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`${stdout}`);
            }

            console.log(`${stdout}`);
            console.warn(`${stderr}`);
        });
    },
    migrateReset: () => {
        exec(`node_modules/sequelize-cli/lib/db:migrate:undo:all --env ${process.env.NODE_ENV}`, (err, stdout, stderr) => {
            if (err) {
                console.error(`${stdout}`);
            }

            console.log(`${stdout}`);
            console.warn(`${stderr}`);
        });
    }
};

