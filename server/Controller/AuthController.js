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
            message:"register successful",
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
        let user =await User.findOne({email})
        if(!user)
            return res.status(400).json("wrong username or password")
        const verifiedPassword =await bcryptjs.compare(password,user.password)
        if(!verifiedPassword)
            return res.status(400).json("wrong username or password")
        const accessToken = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY,{ expiresIn: '15m' })
        const refreshToken = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY,{ expiresIn: '7d' })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        user.refreshToken=refreshToken
        await user.save()
        user = user.toObject()
        delete user.refreshToken
        delete user.password
        return res.status(200).json({
            message:"login successful",
            token:accessToken,
            data:{
                user
            }
        })
    }catch(error){
        console.error('Login error:', error)
        return res.status(500).json(error)
    }
}


exports.logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
  
    if (!refreshToken) {
      return res.sendStatus(204)
    }
  
    try {
      await User.updateOne(
        { refreshToken },
        { $unset: { refreshToken: "" } }
      )
  
      res.clearCookie('refreshToken', {
        httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      })
  
      return res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
      console.error('Logout error:', error)
      res.sendStatus(500)
    }
}
