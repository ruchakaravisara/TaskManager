const { createTask, getAllTask, updateTaskById, deleteTaskById } = require('../Controllers/TaskController');

const router = require('express').Router();

router.get('/',getAllTask);

//create a new task
router.post('/',createTask);

router.put('/:id',updateTaskById);

router.delete('/:id', deleteTaskById);


module.exports = router;  