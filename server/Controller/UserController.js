const { User } = require("../models");

exports.searchUser = async (req, res) => {
    const { key } =  req.params

    try {
        const users = await User.find({
            $or: [
                { name: { $regex: key, $options: 'i' } },  
                { email: { $regex: key, $options: 'i' } }
            ]
        }).select('name email profilePic')

        return res.status(200).json({
            message:'All user',
            data:users,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error'});
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
        const {name, gender, dob} = req.body
        if(!name || !gender || !dob)
            return res.status(400).json("Please fill all the required field!")
        const updatedUser = await User.findOneAndUpdate(
            {email:user.email},
            {$set:{
                name:name,
                gender:gender,
                dob:dob,
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

exports.setAvatar = async(req,res)=>{
    try{
        const user = req.user
        const {profilePic} = req.body
        if(!profilePic)
            return res.status(400).json("profile picture isn't exist!")
        const updatedUser = await User.findOneAndUpdate(
            {email:user.email},
            {$set:{
                profilePic:profilePic,
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