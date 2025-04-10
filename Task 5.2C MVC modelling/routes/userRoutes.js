var express = require('express');
const router = express.Router();
const controller=require("../controllers/userController")

// router.get('/', (req, res)=>{
//     res.send('Hello from the route!')
// });

router.get('/api/projects', (req, res)=>{
    controller.addContent(req,res)
});

module.exports = router;

