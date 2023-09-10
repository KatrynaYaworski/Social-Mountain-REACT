const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const createToken = (username, id) => {
  return jwt.sign(
    {
      username,
      id,
    },
    SECRET,
    {
      expiresIn: "2 days",
    }
  );
};

const logIn = async (req, res) => {
  try {
    let { username, password } = req.body;
    let foundUser = await User.findOne({ where: { username: username } });
    if (foundUser) {
      const isAuthenticated = bcrypt.compareSync(
        password,
        foundUser.hashedPass
      );
      if (isAuthenticated) {
        let token = createToken(
          foundUser.dataValues.username,
          foundUser.dataValues.id
        );
        const exp = Date.now() + 1000 * 60 * 60 * 48;
        console.log(foundUser)
        const data = {
          username: foundUser.dataValues.username,
          userId: foundUser.dataValues.id,
          token: token,
          exp: exp,
        };
        res.status(200).send(data);
      } else {
        res.status(400).send("Password is incorrect");
      }
    } else {
      res.status(400).send("User does not exist.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

const register = async (req, res) => {
  try {
    let { username, password } = req.body;
    let foundUser = await User.findOne({ where: { username: username } });
    if (foundUser) {
      res.status(400).send("Username is not available");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = await User.create({
        username: username,
        hashedPass: hash,
      });
      const token = createToken(
        newUser.dataValues.username,
        newUser.dataValues.id
      );
      const exp = Date.now() + 1000 * 60 * 60 * 48;
      console.log(`newuser = ${newUser}`);
      const data = {
        username: newUser.dataValues.username,
        userId: newUser.dataValues.id,
        token: token,
        exp: exp,
      };
      res.status(200).send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  logIn,
  register,
};
