const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.js");
const todoRouter = require("./routes/todos.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not available",
  });
});


app.use((err, req, res, next) => {
  console.error(err); 
  res.status(500).json({
    message: "Something went wrong",
  });
});

const PORT = 7777;

app.listen(PORT, () => {
  console.log("App listening on PORT : " + PORT);
});
