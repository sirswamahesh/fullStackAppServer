const userModel = require("../models/userModel");

const registerController = async (req,res)=>{
try {
    const {name,email,password}= req.body;
//validation
    if(!name){
        return res.status(400).send({
            success:false,
            message:"name is required"
        })
    }

    if(!email){
        return res.status(400).send({
            success:false,
            message:"email is required"
        })
    }

    if(!password || password.length < 0){
        return res.status(400).send({
            success:false,
            message:"password is required and 6 character long"
        })
    }

    // exisiting user

  const exisitingUser = await userModel.findOne({email})
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
}


module.exports = {registerController};