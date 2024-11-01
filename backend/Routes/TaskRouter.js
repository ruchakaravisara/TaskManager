const { createTask, getAllTask, updateTaskById, deleteTaskById } = require('../Controllers/TaskController');
const authenticateToken = require('../middleware/authMiddleware'); // Ensure you import your middleware

const router = require('express').Router();

// Get all tasks (protected route)
router.get('/:id', authenticateToken, getAllTask);

// Create a new task (protected route)
router.post('/', authenticateToken, createTask);

// Update a task by ID (protected route)
router.put('/:id', authenticateToken, updateTaskById);

// Delete a task by ID (protected route)
router.delete('/:id', authenticateToken, deleteTaskById);

module.exports = router;  
