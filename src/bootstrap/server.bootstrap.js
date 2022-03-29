var http = require("http");
/* app setup */
const PORT = process.env.PORT || 8080;
const hostname = "127.0.0.1";

// ice factory
const serverFunction = () => {
  async function initialize(app) {
    const promiseServer = new Promise((resolve, reject) => {
      server = http.createServer(app);
      server
        .listen(PORT)
        .on("listening", () => {
          console.log(
            `HPM server is running at hosts: ${
              server.address().address
            } on port: ${server.address().port}`
          );
          resolve("succesful");
        })
        .on("error", (err) => {
          console.log(err);
          reject(err);
        });
    });
    await promiseServer;
  }
  
  return Object.freeze({ initialize });
};

module.exports = serverFunction;
