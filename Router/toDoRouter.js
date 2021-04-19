const router = require("express").Router();
const toDoController = require("../Controllers/toDoController");

router.get("/", toDoController.allToDo);
router.get("/:id", toDoController.getToDo);
router.post("/", toDoController.createToDo);
router.patch("/:id", toDoController.updateToDo);
router.patch("/:id/toggle", toDoController.toggleCompleted);
router.delete("/:id", toDoController.deleteToDo);

module.exports = router;
