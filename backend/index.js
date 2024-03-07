const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
const AuthRoutes = require("./Routes/authRoutes");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// limit: "100mb"

const mongoUri = "mongodb://localhost:27017/MediCard";
// "mongodb+srv://bhavdip:bhavdip@atlascluster.dnu8pjn.mongodb.net/MediCard";

mongoose.set("strictQuery", false);

mongoose.connect(mongoUri, () => {
  console.log("Connect to mongo Succesfully");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use("/api/auth", AuthRoutes);
require("./Routes/authRoutes.js")(app);
// require("./Routes/patient")(app);
// app.use("/api/patient", require("./Routes/patient"));

const port = 4000;
app.listen(port, () => {
  console.log(` listening on port ${port}`);
});
