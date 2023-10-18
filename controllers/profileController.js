var db = require('../models');
var User = db.user;
var Profile = db.profile;
const catchAsync = require("../error/catchAsync");
const AppError = require("../error/AppError");

// Add profile

exports.addProfile = catchAsync(async(req,res,next) => {
    const {age, gender, std, UserId} = req.body;
    
    const user = await User.findOne({ where:{ id: UserId }});
    if (!user) {
        next({ status: 404, message: "User not found" });
        return;
    }
    else{
        const isProfile = await Profile.findOne({
            
            where:{
                UserId: req.body.UserId
            }
          })
        if(isProfile)
        {
            res.status(404).json({message: "User Profile already exist."});
            return;
        }
        else{
            const profile = await Profile.create({
                age, gender, std, UserId: user.id
            });

            // console.log("user",user)

            if(profile)
            {
                res.status(201).json({ status : 'success', data : profile});
            }
            else
                res.status(500).json({ status : 'error', message : 'Failed to create the profile'});
        }
    }
    
});



//=== get

exports.getProfiles = catchAsync(async (req, res) => {
    try {
    //   const profile = await Profile.findById(req.params.id).populate('user');
    const profile = await Profile.findAll();

      res.status(200).json({ status: "success", data: profile });
    } catch (error) {
      res.status(400).json({ status: "fail", message: error.message });
    }
});

//----Update Profile

exports.updateProfile = catchAsync(async(req, res,next) => {

    const isProfileExists = await Profile.findOne({ where:{id: req.params.id }});
    if (!isProfileExists) {
        return res
        .status(404)
        .json({ status: "fail", message: "Profile does not exists!" });
    }
    const profile = await Profile.update(req.body,{
        where:{
          id: req.params.id
        }
    });

    if(profile)
    {
        res.status(201).json({ status:'success', data:'profile'});
    }
});