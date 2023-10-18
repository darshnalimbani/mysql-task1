const { DataTypes,Sequelize } = require('sequelize');

const sequelize = new Sequelize("students", "root", "123456", {
  host: "localhost",
  logging: false,
  dialect: "mysql",
});

try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
} 
catch (error) {
    console.error("Unable to connect to the database:", error);
}

const db={};

db.sequelize=sequelize;
db.Sequelize=Sequelize;

db.user=require('./user')(sequelize,DataTypes)
db.profile=require('./profile')(sequelize,DataTypes)

db.user.hasOne(db.profile,{foreignKey:'UserId'});
db.profile.belongsTo(db.user);

db.sequelize.sync({ force: false });


module.exports=db;