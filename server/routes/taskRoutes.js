const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskController');
const passport = require('../config/passport');

router.get("/getTasks", passport.authenticate('jwt', {session: false}), taskController.get_user_tasks);
router.post("/createTask",  passport.authenticate('jwt', {session: false}), taskController.create_task);
router.get("/:taskId", passport.authenticate('jwt', {session: false}), taskController.get_Task_by_id)
router.delete("/:taskId/deleteTask", passport.authenticate('jwt', {session: false}), taskController.delete_task);
router.put("/:taskId/UpdateTask", passport.authenticate('jwt', {session: false}), taskController.update_task)
module.exports = router;