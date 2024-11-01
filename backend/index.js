const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db'); // Ensure your database connection logic is in this file
const PORT = process.env.PORT || 8080;
const TaskRouter = require('./Routes/TaskRouter'); // Import your task routes
const bodyParser = require('body-parser');
const cors = require('cors'); 
const AuthRouter = require('./Routes/AuthRouter'); // Import your authentication routes

app.use(cors()); // Enable CORS
app.get('/', (req, res) => {
    res.send('hello');
}); 

app.use(bodyParser.json()); // Parse incoming JSON requests
app.use('/tasks', TaskRouter); // Mount task routes
app.use('/auth', AuthRouter); // Mount authentication routes
 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
