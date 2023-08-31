const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL),
  { useNewUrlParser: true, useUnifiedTopology: true };

const db = mongoose.connection;
db.on("error", console.error.bind("Connection Error"));
db.once("open", function () {
  console.log("DB CONNECTED");
});
