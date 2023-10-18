var db = require('../models');
var User = db.user;
var Profile = db.profile;
const catchAsync = require("../error/catchAsync");
const AppError = require("../error/AppError");


exports.getAllUsers = catchAsync(async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json({ status: "success", data: users });
    } catch (error) {
      res.status(400).json({ status: "fail", message: error.message });
    }
});

exports.createUser = catchAsync(async (req, res, next) => {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }
    // const user = await User.findOne({ email }).select("+password name email");
    // if (user) {
    //   return next(new AppError("Email is already in use", 401));
    // }
    await User.create({
      name: name,
      email: email,
      password: password,
    });
    res.status(200).json({
      status: "success",
      message: "User Created",
    });
  });

  //  getFullProfile of 1 user

  exports.getUser = catchAsync(async (req, res) => {
    try {
      // const users = await User.findOne({
      //           where :{
      //               id: req.params.id
      //           }
      //       }); //.populate('profile')
      var data = await User.findAll({
        include: 'Profile',
        where:{
          id: req.params.id
        }
      })
      res.status(200).json({ status: "success", data: data });
    } catch (error) {
      res.status(400).json({ status: "fail", message: error.message });
    }
  });

// Delete user

exports.deleteUser =  catchAsync(async(req,res,next) => {
    const user = await User.destroy({
        where:{
          id: req.params.id
        }
      });

  if (user) {
    res.status(200).json({ status: 'success', message: 'User deleted successfully' });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'User not found'
    });
  }
});


// Update user

exports.updateUser = catchAsync(async (req, res) => {
    const isUserExists = await User.findOne({
        where :{
            id: req.params.id
        }
    });
    if (!isUserExists) {
      return res
        .status(404)
        .json({ status: "fail", message: "User does not exists!" });
    }
  
    const user = await User.update(req.body,{
        where:{
          id: req.params.id
        }
    });
    if (user) {
      res.status(200).json({ status: "success" });
    }
  });


// var addUser= async(req,res)=>{
//     const jane = await User.create({ name: "Jane",email: "jane@gmail.com", password: "jane" });
//     console.log(jane instanceof User); // true
//     console.log(jane.name); // "Jane"
//     // await jane.save();
//     console.log('Jane was saved to the database!');
//     console.log(jane.toJSON());
//     res.status(200).json(jane.toJSON());
// };

// var getUsers = async(req,res)=> {
//     const data = await User.findAll({});
//     res.status(200).json({data:data});
// }

// var getUser = async(req,res)=> {
//     const data = await User.findOne({
//         where :{
//             id: req.params.id
//         }
//     });
//     res.status(200).json({data:data});
// }

// module.exports = {
//     addUser,
//     getUsers,
//     getUser,
// };