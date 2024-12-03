require("dotenv").config();
const mongoose = require("mongoose");

const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => {
    console.log("Error connecting to the database");
  });

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 12,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const TodoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: String,
  description: String,
  isCompleted: Boolean,
});

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  User,
  Todo,
};
