const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    // console.log(req.body);
  try {
    const { userName, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      userName,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    
    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: newUser._id,
          userName: newUser.userName,
          role: newUser.role,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Sonething went wrong",
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const User = await user.findOne({ username });
    if (!User) {
      return res.status(404).json({
        status: "fail",
        message: "User with username not found",
      });
    }

    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: User._id, role: User.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: User._id,
          username: User.username,
          role: User.role,
        },
        token,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

module.exports = {
  register,
  login,
};
