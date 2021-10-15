const Task = require("./models");

module.exports = {
    async checarId (req, res, next) {
        let taskID = await Task.findById(req.params.id)
        if(!taskID){
            return res.status(404).json({message: "Id não cadastrado"})
        }
        next();
    }
}