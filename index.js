const express = require('express')
const cors = require('cors')
const crypto = require('crypto');
let test = crypto.createHmac('sha256', "pIPr4nQUjMXeopWG1GvhhtUq").update(
  "order_HmtP55UExXWzdf|pay_HmtPUEovzBVifF"
).digest("hex");
console.log(test);



const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use('/static', express.static('public'))
app.use(express.static('files'))
app.post('/payment/callback',
  function(req, res) {
    console.log(req.body);
    const data = req.body;
    const sign = crypto.createHmac('sha256', "pIPr4nQUjMXeopWG1GvhhtUq").update(`${data.order_id}|${data.id}`).digest("hex");
    if(sign === data.signature) {
      res.status(200);
      res.json({ data: "signature is valid"})
    }else {
      res.status(200);
      res.json({data: "signature is NOT valid"})
      
    }
    
  }  
);

app.listen(3000);