import mongoose from 'mongoose';


const taskSchema = new mongoose.Schema({
    title: {type:String,required:true},
    description: {type:String,required:true,unique:true},
    status: {type:String,enum:['completed','not completed'],default:'not completed'},
    createdAt:{type:Date},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
    
},{timestamps:true})

const Tasks = mongoose.model('Tasks',taskSchema);
export default Tasks;
