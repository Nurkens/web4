import Tasks from "../models/Tasks.js";

class taskController{
    async getTasks(req,res){
        try{
            const tasks = await Tasks.find();
            return res.json(tasks);
            
        }catch(e){
            console.log(e);
        }
    }
    async getOne(req,res){
        try{
            const task = await Tasks.findOne({_id:req.params.id});
            if(!task){
                return res.status(400).json({message:"Task not found"});
            }
            return res.json(task);
        }catch(e){
            console.log(e);
        }
    
    }
    async createTask(req, res) {
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(400).json({ message: "Please fill all fields" });
            }   

            const userId = req.user?.id; 
            if (!userId) {
                return res.status(401).json({ message: "User not authorized" });
            }

            const task = new Tasks({ title, description, userId });
            await task.save();
            return res.status(201).json({ message: "Task created", task });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateTask(req,res){
        try{
            const {title,description} = req.body;
            if(!title || !description){
                return res.status(400).json({message:"please fill all "});
            }   

            const task = await Tasks.findOne({_id:req.params.id});
            if(!task){
                return res.status(400).json({message:"Task not found"});
            }
            const updatedTask = await Tasks.findByIdAndUpdate(req.params.id,{title,description},{new:true});
            return res.json({message:"Task updated",updatedTask});            
        }catch(e){
            console.log(e);
        }
    }
    async deleteTask(req,res){
        try{
            const task = await Tasks.findOne({_id:req.params.id});
            if(!task){
                return res.status(400).json({message:"Task not found"});
            }  
            const deletedTask = await Tasks.findByIdAndDelete(req.params.id);
            return res.json({message:"Task deleted",deletedTask});
        }catch(e){
            console.log(e);
        }
    }

}

export default new taskController();