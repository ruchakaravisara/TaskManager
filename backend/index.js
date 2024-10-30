const express = require('express')
const app = express();
require('dotenv').config();
require('./Models/db')
const PORT =process.env.PORT||8080;

app.get('/',(req,res)=>{
    res.send('hello')
})
 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})