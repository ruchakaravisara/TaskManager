const { createTask } = require('../Controllers/TaskController');

const router = require('express').Router();

router.get('/',(req, res) => {
    res.send('All tasks');
})

//create a new task
router.post('/',createTask)

module.exports = router;  