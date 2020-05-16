const db = require("../models");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const { username, password, name } = req.body;

  const user = await db.User.findOne({ where: { username } });

  if (user) {
    res.status(401).send({ message: "username is already taken" });
  } else {
    const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUNDS));

    const hashPassword = bcryptjs.hashSync(password, salt);

    await db.User.create({ username: username, password: hashPassword, name });

    res.status(201).send({ message: "username created successfully" });
  }
};

const Login = async (req, res) => {
  const { username, password } = req.body;

  const user = await db.User.findOne({ username });

  const getPassword = (user) => {
    if (user) {
      return user.password;
    } else {
      return "this_is_fake_password_sfsdffffxcvxcvDD1321vbcbntfg";
    }
  };

  const isSuccess = bcryptjs.compareSync(password, getPassword(user));

  if (isSuccess && user) {
    const payload = {
      id: user.id,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    res.status(201).send(token);
  } else {
    res.status(401).send({ message: "password or username is wrong" });
  }
};

module.exports = { Register, Login };
