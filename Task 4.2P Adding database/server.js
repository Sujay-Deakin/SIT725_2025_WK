const express = require("express")
const app = express()

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.get('/api/projects',(req,res) => {
    res.json({statusCode: 200, data: cardList, message:"Success"})
})

var port = process.env.port || 3006;

app.listen(port,()=>{
    console.log("App running at http://localhost:"+port)
})