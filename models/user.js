module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isLowercase: true,
        unique: true,
        validate: {
          isEmail: { msg: "It must be a valid Email address" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      //   profile: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: 'Profile',
      // },
    },
    {
      // Other model options go here
      sequelize,
      timestamps: false,
    }
  );

  // `sequelize.define` also returns the model
    return User;
  console.log(User === sequelize.models.User); // true
};
