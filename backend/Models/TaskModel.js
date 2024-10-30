const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema =new Schema({
    title: {type: String, required: true},
    description: {type: String},
    status: {type: Boolean, required: true},
    
})

const TaskModel = mongoose.model('todos', TaskSchema);

module.exports = TaskModel;