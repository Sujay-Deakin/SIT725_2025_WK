var express = require("express")
var app = express()
var users = [];

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const addNumbers = (number1, number2) => {
    var num1 = parseInt(number1)
    var num2 = parseInt(number2)
    var result = num1 + num2;
    return result;
}

app.get("/addTwoNumbers",(req,res) => {
    var number1 = req.query.number1;
    var number2 = req.query.number2;
    var result = addNumbers(number1,number2)
    res.json({statusCode: 200, data: result, message:"Success"})
})

app.post("/user/create",(req,res) => {
    let userData = {}
    userData.name = req.body.name;
    userData.age = req.body.age;
    users.push(userData);
    res.json({statusCode: 200, data: userData, message:"Created"})
})

app.get("/user",(req,res) => {
    res.json({statusCode: 200, data: users, message:"Success"})
})

var port = process.env.port || 3000;

app.listen(port,()=>{
    console.log("App listening to: "+port)
})