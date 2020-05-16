module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: dataTypes.STRING,
    },
    password: {
      type: dataTypes.STRING,
    },
    name: {
      type: dataTypes.STRING,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Todo, { foreignKey: "user_id" });
  };

  return User;
};
