
const mongoose = require('mongoose');
var express = require("express")
var app = express()
const userRoutes = require("./routes/userRoutes")
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'))
app.use(express.static(__dirname+'views'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine","ejs")
mongoose.connect('mongodb://localhost:27017/myprojectDB', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    setInterval(()=>{
        const randomNum = Math.floor(Math.random() * 100);
        socket.emit('number', randomNum);
    }, 1000);
});

// using routes from userRoutes
app.use("/", userRoutes);

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

app.get('/api/pjts', (req,res) => {
    // const projects = await Project.find({});
    res.json({statusCode: 200, data: cardList, message:"Success"})
})
    
app.get("/",(req,res)=>{
    app.use(express.static(__dirname+'public'))
    res.render("index");
});
// ,"index.html"
var port = process.env.port || 3006;

http.listen(port, ()=>{
    console.log("App with socket.io running at http://localhost:"+port)
})