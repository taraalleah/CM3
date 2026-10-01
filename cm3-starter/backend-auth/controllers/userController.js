const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};


const signupUser = async (req, res) => {
  const { 
    fullName,
    email,
    password,
    phoneNumber,
    gender,
    date_of_birth,
    accountType
    } = req.body;

  try {
    if (
        !fullName ||
        !email ||
        !password ||
        !phoneNumber ||
        !gender ||
        !date_of_birth ||
        !accountType
    ) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    const exists = await User.findOne({ email });

    if (exists) {
      throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ 
        fullName,
        email,
        password: hash,
        phoneNumber,
        gender,
        date_of_birth,
        accountType
    });

    // create a token
    if (user){
        const token = createToken(user._id);
        res.status(201).json({ email, token });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("All fields must be filled");
    }

       const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(user._id);
      res.status(200).json({ email, token });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { signupUser, loginUser };