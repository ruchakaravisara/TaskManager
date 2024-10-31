const express = require('express')
const app = express();
require('dotenv').config();
require('./Models/db')
const PORT =process.env.PORT||8080;
const TaskRouter =require('./Routes/TaskRouter');
const bodyParser = require('body-parser');

app.get('/',(req,res)=>{
    res.send('hello')
}); 

app.use(bodyParser.json());
app.use('/tasks',TaskRouter);
 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})