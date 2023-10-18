const express = require('express');
require('./models'); //const models =
require('./models/index');
const sequelize = require('./models');
const userController = require('./controllers/userController');
const profileController = require('./controllers/profileController');


const app =express();
app.use(express.json());

app.get('/', function(req,res){
    res.send("Hello World");
});
app.use('/', require('./routes'));

// app.get('/add',userController.addUser);

// app.get('/user/:id',userController.getUser);
// app.get('/users',userController.getUsers);

console.log("The table for the User model was just (re)created!");

app.listen(3000,() => { console.log("App will run on localhost.");})