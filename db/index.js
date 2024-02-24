const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://anony6905:faisald181@cluster0.zwdgraw.mongodb.net/Task-Management");

const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    name:String,
});

const TaskSchema=new mongoose.Schema({
    title:String,
    description:String,
    created:Date,
    lastUpdated:Date,
    dueDate:Date,
})

const User=mongoose.model('User',UserSchema);
const Task=mongoose.model('Tasks',TaskSchema);

module.exports={
    User,
    Task
};