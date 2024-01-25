const express = require("express");
const multer = require("multer");
const router = express.Router();
const allData = require("../Module/userModule");
const bcrypt = require("bcryptjs");
const books = require("../Module/booksModule");
const jwt = require("jsonwebtoken");
const Order = require("../Module/Order")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const secretKey = process.env.JWT_SECRET || "mySecreateKey";

router.get("/getData", async (req, res) => {
  try {
    const data = await allData.find();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
 
router.post("/postData", async (req, res) => {
  try {
    const { userName, email, password, phoneNo, address, birthdate } = req.body;
    const validateEmail = await allData.findOne({ email: email });
    const salt = await bcrypt.genSalt(8);
    const hashpassword = await bcrypt.hash(password, salt);
    const data = {
      userName: userName,
      email: email,
      password: hashpassword,
      phoneNo: phoneNo,
      address: address,
      birthdate: birthdate
    };
    if (validateEmail) {
      console.log("email already exists");
      return res.status(400).send("email already exists");
    }

    await allData.create(data);
    return res.status(201).send("Data saved successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.put("/updateData/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { userName, email, password, phoneNo, address, birthdate } = req.body;

    // Check if the user with the given userId exists
    const existingUser = await allData.findById(userId);
    console.log(userId)
    if (!existingUser) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }
    
    // Update user data
    existingUser.userName = userName || existingUser.userName;
    existingUser.email = email || existingUser.email;
    existingUser.phoneNo = phoneNo || existingUser.phoneNo;
    existingUser.address = address || existingUser.address;
    existingUser.birthdate = birthdate || existingUser.birthdate;

    // If a new password is provided, hash and update the password
    if (password) {
      const salt = await bcrypt.genSalt(8);
      existingUser.password = await bcrypt.hash(password, salt);
    }

    await existingUser.save();
    return res.status(200).send("Data updated successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const validatemail = await allData.findOne({ email: email });
    

    if (validatemail) {
      const confirmpassword = await bcrypt.compare(
        password,
        validatemail.password
      );
      console.log(confirmpassword);

      if (confirmpassword) {
        const token = jwt.sign(
          { userId: validatemail._id, email: validatemail.email },
          secretKey,
          { expiresIn: "1h" } // Set the expiration time as needed
        );
        res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

        res.status(200).json({ message: "Successfully logged in", token });

        console.log("the token" + token);
      } else {
        res.status(400).send("Password does not match");
      }
    } else {
      res.status(404).send("User not found...");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/', async(req, res) => {
  res.send('Hello World!');
});

router.post("/books", upload.single("image"), async (req, res) => {
  try {
    const { title, author, publishedYear, description } = req.body;

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const profileImage = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    await books.create({
      title,
      author,
      publishedYear,
      description,
      image: profileImage,
    });

    res.status(201).send("Data saved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/books', async (req, res) => {
  try {
    const book = await books.find();
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/books/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const book = await books.findById(_id);
    res.status(200).json(book);
  } catch (error) {
    console.error('Internal server error while getting book by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const verifyToken = (req, res, next) => {
  const Newtoken = req.cookies.token;
  res.setHeader('Access-Control-Allow-Origin', 'http://3.210.184.253:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (!Newtoken) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  jwt.verify(Newtoken, process.env.JWT_SECRET || "mySecreateKey", (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized: Invalid token");
    }
    req.userId = decoded.userId;
    next();
  });
};

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await allData.findById(req.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }
    // Only send necessary user details, not sensitive information
    const userProfile = {
      userName: user.userName,
      email: user.email,
      phoneNo: user.phoneNo,
      _id: user._id,
      newItem:user.newItem
      // Add other user details as needed
    };

    res.json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Logout route
router.post("/logout", verifyToken, async (req, res) => {
  await res.clearCookie("token"); // Clear the token cookie
  res.status(200).send("Logged out successfully");
});

router.post('/addToCart/:userId', upload.single("image"), async (req, res) => {
  const userId = req.params.userId;
  const newItem = req.body.newItem;

  // Check if newItem exists in the request body
  if (!newItem) {
    return res.status(400).json({ error: 'New item details missing in the request body' });
  }

  try {
    // Find the user by ID
    const user = await allData.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Assign properties to newItem
    newItem.title = req.body.newItem.title;
    newItem.author = req.body.newItem.author;
    newItem.category = req.body.newItem.category; // Fix the typo here
    newItem.price = req.body.newItem.price;    
    newItem.publishedYear = req.body.newItem.publishedYear;
    newItem.description = req.body.newItem.description;
    
    if (req.file) {
      newItem.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    // Add the new item object to the cart array
    user.newItem.push(newItem);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.delete('/removeFromCart/:itemId',verifyToken, async (req, res) => {
  const userId = req.userId;
  const itemId = req.params.itemId;

  try {
    const user = await allData.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Ensure that user.cart is an array or initialize it as an empty array
    user.newItem = Array.isArray(user.newItem) ? user.newItem : [];

    // Remove the item from the cart based on itemId
    user.newItem = user.newItem.filter((item) => item._id.toString() !== itemId);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const orderDetails = req.body;
    await Order.create(orderDetails);

    // Optionally, you can send a response back to the client
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Example route for updating cart items

module.exports = router;
