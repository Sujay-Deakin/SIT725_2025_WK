const mongoose = require('mongoose');

var express = require("express")
var app = express()

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/myprojectDB', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!');
});

const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});
const Project = mongoose.model('Project', ProjectSchema);


const cardList = [
    {
        title: "Mangrove Forests",
        image: "images/mangrove.jpg",
        link: "About Mangrove Forests",
        desciption: "Mangroves are salt-tolerant trees and shrubs adapted to thrive in the intertidal zones of coastal areas, characterized by their unique root systems and ability to tolerate high salinity. "
    },
    {
        title: "Grasslands",
        image: "images/grasslands.jpg",
        link: "About Grasslands",
        desciption: "Grassland vegetation is dominated by grasses (Poaceae), but also includes sedges (Cyperaceae), rushes (Juncaceae), legumes, and other herbs, forming a diverse ecosystem found on every continent except Antarctica. "
    }
]

// sample code to seed database
const sampleProject = new Project({
    title: "Shrublands",
    image: "images/shrublands.jpg",
    link: "About Shrublands",
    description: "Shrubland is a plant community dominated by shrubs, often including grasses, herbs, and geophytes, and can occur naturally or result from human activity, potentially being a stable or transitional vegetation type. "
});
sampleProject.save().then(() => console.log("Sample project saved!"));
// 

app.get('/api/projects', async(req,res) => {
    const projects = await Project.find({});
    res.json({statusCode: 200, data: cardList, message:"Success"})
})
    
var port = process.env.port || 3006;

app.listen(port, ()=>{
    console.log("App running at http://localhost:"+port)
})