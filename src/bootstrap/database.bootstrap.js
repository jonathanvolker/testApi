var mongoose = require("mongoose");
const dbConfig = require("../config/db.config");

const HOSTS_RX =
  /(mongodb(?:\+srv|)):\/\/(?: (?:[^:]*) (?: : ([^@]*) )? @ )?([^/?]*)(?:\/|)(.*)/;
const getConnectionString = async () => {
  //   const fileExists = await filePathExists(desiredFile);
  let connectionString;
  const dbPassword = process.env.DATABASE_PASSWORD;
  const dbUser = process.env.DATABASE_USER;
  const dbHost = process.env.DATABASE_HOST;
  const dbName = process.env.DB_NAME;
  //   TODO: alternative of setting up env variables through env.yaml or .env
  connectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

  return connectionString;
};

const dbMongoose = () => {
  function disconnect() {
    try {
      mongoose.disconnect;
    } catch (e) {
      console.log("Disconnected from Database", e);
    }
  }
  async function initialize() {
    const connectionString = await getConnectionString();
    console.log(connectionString);
    const cap = connectionString.match(HOSTS_RX);
    if (!cap) {
      console.log(connectionString);
      reject("incorrect mongo connection string");
    }
    const promiseInitialize = new Promise(async (resolve, reject) => {
      // mongoose.set('useFindAndModify', true);
      mongoose
        .connect(connectionString, dbConfig)
        .then(() => {
          console.log("Connection Database successful");
          resolve("Connection Database successful");
        })
        .catch((err) => {
          console.log("there was an error connecting mongoose");
          reject(err);
        });
    });

    return await promiseInitialize;
  }

  return Object.freeze({ initialize, disconnect });
};

module.exports = dbMongoose;
