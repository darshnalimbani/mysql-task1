module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define(
      "Profile",
      {
        // Model attributes are defined here
        age: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: false,
          isLowercase: true,
        },
        std: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        UserId: DataTypes.INTEGER
      },
      {
        // Other model options go here
        sequelize,
        timestamps: false,
      }
    );
  return Profile;
    // `sequelize.define` also returns the model
    console.log(Profile === sequelize.models.Profile); // true
  };
  