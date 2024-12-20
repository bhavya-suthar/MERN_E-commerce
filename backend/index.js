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

const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

// const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

//Database Connection with mongodb
mongoose
  .connect(
    "mongodb://ecommerceMern:user123@cluster0-shard-00-00.fd5d5.mongodb.net:27017,cluster0-shard-00-01.fd5d5.mongodb.net:27017,cluster0-shard-00-02.fd5d5.mongodb.net:27017/ecommerce-mern?ssl=true&replicaSet=atlas-c46g9h-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

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
    // Check the total number of products
    const productCount = await Product.countDocuments();

    // If the product count is 10 or more, return an error response
    if (productCount >= 10) {
      return res.status(400).json({
        success: false,
        message: "Product limit reached. Cannot add more than 10 products.",
      });
    }
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
// const fetchUser = async (req, res, next) => {
//   const token = req.header("auth-token");
//   console.log("🚀 ~ fetchUser ~ token:", token)
//   if (!token) {
//     res.status(401).send({ errors: "please authenticate using valid login" });
//   } else {
//     try {
//       const data = jwt.verify(token, "secret_ecom");
//       req.user = data.user;
//       next();
//     } catch (error) {
//       res
//         .status(401)
//         .send({ errors: "please authenticate using a valid token" });
//     }
//   }
// };

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  console.log("Token received:", token);
  if (!token) {
    return res
      .status(401)
      .send({ errors: "please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    console.log("Token decoded:", data);
    req.user = data.user;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res
      .status(401)
      .send({ errors: "please authenticate using a valid token" });
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
  console.log("Removed", req.body.itemId);
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

app.post("/getcart", fetchUser, async (req, res) => {
  console.log("get cart");
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// const calculateTotalPrice = async (cartData) => {
//   let totalPrice = 0;

//   // Iterate through the cart data and calculate the total
//   for (const itemId in cartData) {
//     if (cartData.hasOwnProperty(itemId)) {
//       const quantity = cartData[itemId];
      
//       // Fetch the product details from the database using the itemId
//       const product = await Product.findOne({ id: itemId });

//       if (product) {
//         totalPrice += product.new_price * quantity;
//       }
//     }
//   }

//   return totalPrice;
// };
// app.post("/order", fetchUser, async (req, res) => {
//   try {
//     console.log('Received order request:', req.body); // Log the request body

//     const {
//       userName,
//       fullname,
//       email,
//       country,
//       city,
//       address,
//       paymentMethod,
//       cardNumber,
//       cardExpiry,
//       cardCVV,
//       terms,
//     } = req.body;

//     // Validate required fields
//     if (
//       !userName ||
//       !fullname ||
//       !email ||
//       !country ||
//       !city ||
//       !address ||
//       !paymentMethod ||
//       terms === undefined
//     ) {
//       return res.status(400).json({ error: "All fields are required!" });
//     }

//     // Fetch user and cart data
//     const user = await User.findById(req.user.id);
//     if (!user || !user.cartData) {
//       return res.status(404).json({ error: "User or cart not found" });
//     }

//     // Calculate the total price of the items in the cart
//     const totalPrice = await calculateTotalPrice(user.cartData); // Make sure to await the calculation

//     // Create order object
//     const orderData = {
//       userId: user._id,
//       userName,
//       fullname,
//       email,
//       country,
//       city,
//       address,
//       cartItems: user.cartData,
//       totalPrice,
//       paymentMethod,
//       terms,
//       paymentStatus: paymentMethod === "Card" ? "Pending" : "Completed",
//     };

//     // For card payment, store the card details
//     if (paymentMethod === "Card") {
//       if (!cardNumber || !cardExpiry || !cardCVV) {
//         return res.status(400).json({ error: "Card details are required for card payment" });
//       }

//       orderData.cardDetails = {
//         cardNumber,
//         cardExpiry,
//         cardCVV,
//       };
//     }

//     // Save the order to the database
//     const newOrder = new Order(orderData);
//     await newOrder.save();

//     res.status(201).json({ message: "Order placed successfully!", orderId: newOrder._id });
//   } catch (error) {
//     console.error("Error while saving order:", error);
//     res.status(500).json({ error: "Error saving order data" });
//   }
// });


app.post("/checkout", fetchUser, async (req, res) => {
  try {
    const { cartItems, paymentMethod } = req.body; // Extract data from payload

    // Validate the payload
    if (!cartItems || Object.keys(cartItems).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Cart items are required" });
    }

    if (!paymentMethod) {
      return res
        .status(400)
        .json({ success: false, message: "Payment method is required" });
    }

    // Fetch user details
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Process the checkout
    console.log("Processing checkout for user:", user.name);
    console.log("Cart Items:", cartItems);
    console.log("Payment Method:", paymentMethod);

    // Clear the user's cart after checkout
    user.cartData = {}; // Clear the cart data
    for (let i = 0; i < 300; i++) {
      user.cartData[i] = 0; // Reset the cart items
    }
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: user.cartData });

    res.json({ success: true, message: "Checkout successful. Cart cleared." });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ success: false, message: "Error during checkout" });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running on port " + port);
  } else {
    console.log("Error:" + error);
  }
});