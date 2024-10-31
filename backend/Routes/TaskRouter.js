const { createTask, getAllTask } = require('../Controllers/TaskController');

const router = require('express').Router();

router.get('/',getAllTask)

//create a new task
router.post('/',createTask)

module.exports = router;  