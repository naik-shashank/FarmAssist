const mongoose = require("mongoose")

const {generateApiKey,generateAuthToken}=require("../utils/jwt&key")
const User=require("../models/user_model")

exports.SignUp=async (req,res)=>{
    try{
        const {name,email,pass}=req.body
       
    if(!name || !email || !pass) return res.status(400).json({
        status:"fail",
        data:"name,email & password are compulsory"
    })
    

    const result=await User.create({
        name,email,password:pass
    })

    const token=generateAuthToken(result._id)


    res.status(200).json({
        status:"success",
        data:"user created successfully",
        jwt:token
    })

    } catch(err){

      console.log(err)
      res.status(400).json({
        status:"fail",
        data:err.code==11000 ? "Account Already Exists With The Email" : "Something Went Wrong"
      })
    }
    
}


exports.login=async (req,res)=>{
    
    const { email, pass} = req.body;
    console.log(email,pass)
    if(!email || !pass) return res.status(400).json({
      status:"fail",
      data:"name,email & password are compulsory"
  })

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    // Compare hashed password
    const isMatch = await user.comparePassword(pass);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid pas" });
    }

    // Generate JWT Token
    const token = generateAuthToken(user._id)

    res.status(200).json({
        status:"success",
        data:"Log In successfull",
        jwt:token
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ status:"success",data: "Server error" });
  }
    
}


exports.dashboard= async (req,res)=>{
  try{
    const user=req.user

    const responce_data={
      api_key:user.api_key,
      total_api_calls:user.apiUsageCount,
      totalRemaining:user.totalRemaining,
      lastRequestAt:user.lastRequestAt,
      history:user.lastRequests
    }
    res.status(200).json(responce_data)

  }catch (err) {
    console.error(err);
    res.status(500).json({ status:"success",data: "Server error" });
  }
}