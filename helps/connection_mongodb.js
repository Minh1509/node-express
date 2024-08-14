const mongoose = require("mongoose");
require("dotenv").config();


function ConnectionMongoDb() {
  const uri =
    "mongodb+srv://minh1908:minh1908@cluster0.jqm81gs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const conn = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  conn.on("connected", function () {
    console.log(`mongose::: connected::: ${this.name}`);
  });
  conn.on("disconnected", function () {
    console.log(`mongose::: disconnected::: ${this.name}`);
  });
  conn.on("error", function (error) {
    console.log(`mongose::: error::: ${JSON.stringify(error)}`);
  });
  process.on("SIGINT", async () => {
    await conn.close();
    process.exit();
  });
  return conn;
}

module.exports = ConnectionMongoDb;
