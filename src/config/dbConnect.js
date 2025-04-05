const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      `MongoDB Connected: ${connect.connection.host}, ${connect.connection.name}`
    );
  } catch (errr) {
    console.log(`Error: ${errr.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
