const express = require("express");
const { authMiddleware } = require("../middleware/middleware");
const { Todo } = require("../db/db");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const userId = req.userId;

  if (!title || !description) {
    return res.status(400).json({
      message: "Title and description required",
    });
  }

  const todo = await Todo.create({
    userId,
    title,
    description,
    isCompleted: false,
  });

  if (todo) {
    res.json({
      message: "Todo created successfully",
      todo,
    });
  } else {
    res.json({
      message: "Failed to create todo",
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const allTodos = await Todo.find({
    userId,
  });
  if (allTodos.length > 0) {
    res.json({
      allTodos,
    });
  } else {
    res.json({
      message: "no todos",
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const todo = await Todo.findOne({
      _id: id,
      userId,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    await Todo.deleteOne({ _id: id });

    res.json({
      message: "Todo deleted successfully",
    });
  } catch (e) {
    console.log("Error deleting todo", e);
    res.status(500).json({
      message: "Failed to delete the todo",
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const title = req.body.title;
  const description = req.body.description;

  if (!title && !description) {
    return res.status(400).json({
      message: "Title or description needed to update",
    });
  }

  const todo = await Todo.findOne({
    _id: id,
    userId,
  });
  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  const updateTodo = await Todo.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        title: title || todo.title,
        description: description || todo.description,
      },
    }
  );

  const newTodo = await Todo.findById(id);

  res.json({
    message: "todo updated successfully",
    newTodo,
  });
});

module.exports = router;
