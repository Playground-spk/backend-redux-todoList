const express = require("express");
const router = express.Router();

const TodoController = require("../controllers/Todo");

const passport = require("passport");

const auth = passport.authenticate("jwt", { session: false });

router.post("/add-todo", auth, TodoController.addTodo);

router.get("/", auth, TodoController.getToDoList);

router.get("/check-token", auth, TodoController.checkToken);

router.patch("/goto-done", auth, TodoController.goToDone);

router.patch("/goto-doing", auth, TodoController.goBackToDoing);

module.exports = router;
