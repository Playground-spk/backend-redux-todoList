const db = require("../models");

const addTodo = async (req, res) => {
  const { header, description } = req.body;
  const result = await db.Todo.create({
    header,
    description,
    checked: false,
    done: false,
    user_id: req.user.id,
  });

  res.status(201).send(result);
};

const getToDoList = async (req, res) => {
  const result = await db.Todo.findAll();

  res.status(200).send(result);
};

const goToDone = async (req, res) => {
  if (req.body.id) {
    console.log("hello goto done");
    console.log(req.body.id);
    await db.Todo.update(
      { done: true, checked: false },
      { where: { id: req.body.id } }
    );
  }

  res.status(200).send({ message: "TodoList update success" });
};

const goBackToDoing = async (req, res) => {
  console.log("hello back");
  await db.Todo.update({ done: false }, { where: { id: req.body.id } });

  res.status(200).send({ message: "todoList Updated" });
};

const checkToken = async (req, res) => {};

module.exports = { addTodo, getToDoList, checkToken, goToDone, goBackToDoing };
