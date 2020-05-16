module.exports = (sequelize, dataTypes) => {
  const Todo = sequelize.define("Todo", {
    header: {
      type: dataTypes.STRING,
    },
    description: {
      type: dataTypes.STRING,
    },
    checked: {
      type: dataTypes.BOOLEAN,
    },
    done: {
      type: dataTypes.BOOLEAN,
    },
  });
  Todo.associate = (models) => {
    Todo.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Todo;
};
