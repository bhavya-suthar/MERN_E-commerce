const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");

app.use(express.json());
app.use(cors());

//Database Connection with mongodb
mongoose.connect(
  "mongodb://ecommerceMern:user123@cluster0-shard-00-00.fd5d5.mongodb.net:27017,cluster0-shard-00-01.fd5d5.mongodb.net:27017,cluster0-shard-00-02.fd5d5.mongodb.net:27017/ecommerce-mern?ssl=true&replicaSet=atlas-c46g9h-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
);

//API creation
app.get("/", (req, res) => {
  res.send("Express App is running");
});

//Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });
//creating upload endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//schema for creating product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

//creating API for add product

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    // id: req.body.id,
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log("🚀 ~ app.post ~ product:", product);
  await product.save();
  console.log("🚀 ~ app.post ~ save:");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//creating API for remove product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//creating API for get all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

//Schema user model
const User = mongoose.model("User", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

app.post("/signup", async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with same email address",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//creating endpoint for user login
app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const passMatch = req.body.password === user.password;
    if (passMatch) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Address" });
  }
});

//creating endpoints for latest products
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log(" NewCollection Fetched");
  res.send(newcollection);
});

//creating endpoint for popular products
app.get("/popularproducts", async (req, res) => {
  let products = await Product.find({ category: "men" });
  let popularproducts = products.slice(0, 4);
  console.log("popular products fetched");
  res.send(popularproducts);
});

//creating middlewear to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "please authenticate using valid login" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "please authenticate using a valid token" });
    }
  }
};

//creating endpoint for adding products in cartData
app.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  // res.send("Added");
  res.json({ success: true, message: "Added" });
  console.log(req.body, req.user);
});

//creating endpoint for removing cart product
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed",req.body.itemId)
  let userData = await User.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});

//creating endpoint to delete a product from the cart
app.post("/deletecartitem", fetchUser, async (req, res) => {
  console.log("Deleting Item from Cart", req.body.itemId);
  
  let userData = await User.findOne({ _id: req.user.id });
  
  // Set the product's quantity to 0 or remove it entirely
  userData.cartData[req.body.itemId] = 0;

  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );

  res.json({ success: true, message: "Item deleted from cart" });
});

app.post('/getcart',fetchUser,async(req,res)=>{
  console.log('get cart')
  let userData = await User.findOne({_id:req.user.id})
  res.json(userData.cartData)
})

app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running on port " + port);
  } else {
    console.log("Error:" + error);
  }
});