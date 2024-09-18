const { User } = require("../models")
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')
exports.register = async(req,res)=>{
    try{
        const { name, email, password, profilePic} = req.body
        if (!name || !email || !password)
            return res.status(400).json("Please fill all the required field!")

        const checkEmail = await User.findOne({email})
        if(checkEmail)
            return res.status(400).json("email has exist")

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            profilePic,
            password: hashPassword
        }
        
        const user = await User.create(payload)

        return res.status(201).json({
            message:"register success",
            data: {
                user,
            }
        })
    }catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
  }
}


exports.login = async(req,res)=>{
    try{
        const {email, password} = req.body
        if (!email || !password)
            return res.status(400).json("Please fill all the required field!")
        const user =await User.findOne({email})
        if(!user)
            return res.status(401).json("invalid email or password")
        const verifiedPassword =await bcryptjs.compare(password,user.password)
        if(!verifiedPassword)
            return res.status(401).json("invalid email or password")
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.TOKEN_SECRET_KEY,
        )
        user.password = undefined

        return res.status(200).json({
            message:"login success",
            token,
            data:{
                user
            }
        })
    }catch(error){
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

exports.getUserInfo = async(req,res)=>{
    try{
        const user = req.user
        user.password = undefined
        return res.status(200).json(user)
    }catch(error){
        return res.status(500).json({ error: error });
    }
}

exports.updateUserInfo = async(req,res)=>{
    try{
        const user = req.user
        const {name, email, profilePic} = req.body
        if(!name || !email)
            return res.status(400).json("Please fill all the required field!")
        const verifiedEmail = await User.findOne({email})
        if(verifiedEmail)
            return res.status(401).json("email has exist")
        const updatedUser = await User.findOneAndUpdate(
            {email:user.email},
            {$set:{
                email:email,
                name:name,
                profilePic:profilePic
            }},
            {new:true}
        )
        if(!updatedUser)
            return res.status(401).json("Error has occur")
        return res.status(200).json({
            message:"updating success",
            data:{updatedUser}
        })
    }catch(error){
        return res.status(500).json({ error: error })
    }
}