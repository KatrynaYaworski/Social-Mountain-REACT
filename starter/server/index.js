require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const {SERVER_PORT} = process.env;
const { sequelize } = require("./util/database");

const { logIn, register } = require("./controllers/auth");

const {
  addPost,
  getAllPosts,
  getCurrentUserPosts,
  editPost,
  deletePost,
} = require("./controllers/post");

const { isAuthenticated } = require("./middleware/isAuthenticated");

const { User } = require("./models/user");
const { Post } = require("./models/post");

app.use(express.json());
app.use(cors());

User.hasMany(Post);
Post.belongsTo(User);

app.post("/register", register);
app.post("/login", logIn);
app.post("/posts", isAuthenticated, addPost);

app.get("/posts", getAllPosts);
app.get("/userposts/:userId", getCurrentUserPosts);

app.put("/posts/:id", isAuthenticated, editPost);

app.delete("/posts/:id", isAuthenticated, deletePost);

sequelize
  .sync()

  .then(() => {
    app.listen(SERVER_PORT, () =>
      console.log(`db sync successful & server running on port ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log(err));
