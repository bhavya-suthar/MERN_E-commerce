const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//Database Connection with mongodb
mongoose.connect(
  "mongodb://ecommerceMern:user123@cluster0-shard-00-00.fd5d5.mongodb.net:27017,cluster0-shard-00-01.fd5d5.mongodb.net:27017,cluster0-shard-00-02.fd5d5.mongodb.net:27017/ecommerce-mern?ssl=true&replicaSet=atlas-c46g9h-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
);

//API creation
app.get("/",(req,res)=>{
    res.send("Express App is running")
})
app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running on port " + port);
  } else {
    console.log("Error:" + error);
  }
});
