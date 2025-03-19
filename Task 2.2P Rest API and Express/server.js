var express = require("express")
const path = require('path'); // Make sure to include this
var app = express()
var port = process.env.port || 3003;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/calc', (req, res) => {
  const n1 = parseFloat(req.query.n1);
  const n2 = parseFloat(req.query.n2);
  
  if (isNaN(n1)) {
    return res.send("Error: Please provide a valid number");
  }
  
  const sum = n1 + n2;
  const prod = n1 * n2;
  const diff = n1 - n2;
  const pow1 = Math.pow(n1,n2);
  const quo = n1 / n2;
  res.send(`<h3> The sum of ${n1} and ${n2} is: ${sum} <h3><h3> The product of ${n1} and ${n2} is: ${prod} <h3><h3> The difference between ${n1} and ${n2} is: ${diff} <h3><h3> The quotient of ${n1} and ${n2} is: ${quo} <h3><h3> ${n1} to the power of ${n2} is: ${pow1} <h3>`);
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});