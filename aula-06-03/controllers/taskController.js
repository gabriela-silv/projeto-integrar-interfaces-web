const Task = require("../models/task")

const createTask = async (title) => {
 const finished = false;

 const newTask = new Task({
   title,
   finished,
 });

 await newTask.save();

return newTask;
};

const getAllTasks = async () => {
 const tasks = await Task.find();
 return(tasks);
};

const deleteTask = async (id) => {
 const task = await Task.findById(id);

 await Task.deleteOne({ _id: id });
 return true;
};

const editTask = async (id, title, finished) => {

 let task = await Task.findByIdAndUpdate(id, { title, finished }, {new: true});

 return task;
};

module.exports = { getAllTasks, createTask, editTask, deleteTask };

