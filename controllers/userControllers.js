const userModel = require("../models/userModel");

const JWT = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("hellooooooo", name, email, password);
    //validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }

    if (!password || password.length < 0) {
      return res.status(400).send({
        success: false,
        message: "password is required and 6 character long",
      });
    }

    // exisiting user

    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(500).send({
        success: false,
        message: "User Already Register With This EMail",
      });
    }

    //save user
    const user = await userModel({
      name,
      email,
      password,
    }).save();

    return res.status(201).send({
      success: true,
      message: "Registeration Successfull please login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Provide email or password",
      });
    }

    // find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }

    //match password

    const matchPassword = password === user.password;
    if (!matchPassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    // user.password = undefined;

    //token
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { name, password, email, _id } = req.body;
    console.log(name, password, email, _id);
    //user find
    const user = await userModel.findOne({ _id });
    console.log(user);
    //password validate
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be 6 character long",
      });
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { _id },
      {
        name: name || user.name,
        password: password || user.password,
        email: email || user.email,
      },
      {new:true},
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Please Login",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In User Update Api",
      error,
    });
  }
};

module.exports = { registerController, LoginController, updateUserController };
