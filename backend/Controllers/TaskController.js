const TaskModel = require("../Models/TaskModel");

//create task
const createTask = async (req, res) => {
  const data = req.body;
  try {
    const model = new TaskModel(data);
    await model.save();
    res
      .status(201)
      .json({
        message: "Task created successfully",
        success: true,
        data: model,
      });
  } catch (err) {
    res.status(500).json({ message: "Failed to create task", success: false });
  }
};

//get all tasks
const getAllTask = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await TaskModel.find({ user: id });
    res.status(200).json({ message: "All Tasks", success: true, data });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to Get All Tasks",
        success: false,
        error: err.message,
      });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    await TaskModel.findByIdAndUpdate(id, obj);
    res
      .status(200)
      .json({ message: "Task updated successfully", success: true });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to update Task",
        success: false,
        error: err.message,
      });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await TaskModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Task Delete Successfully", success: true });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to Delete Tasks",
        success: false,
        error: err.message,
      });
  }
};

module.exports = {
  createTask,
  getAllTask,
  updateTaskById,
  deleteTaskById,
};
