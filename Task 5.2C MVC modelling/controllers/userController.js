const content = require("../services/model")

exports.addContent = async (req, res)=>{
    try{
        const first_name=req.query.first_name
        const last_name=req.query.last_name
        const password=req.query.password
        const email=req.query.email
        console.log("data", first_name, last_name, password, email)
        const sampleProject = new content({first_name, last_name, password, email});
        await sampleProject.save();
        console.log("content saved!");
    }
    catch(error){
        console.log("failed", error);
    }
}