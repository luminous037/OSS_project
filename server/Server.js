const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000; //포트 번호

app.unsubscribe(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

 
app.get('/MyPage/:id',(res,req)=>{
  const q = req.params
})

app.get('/hi',(req,res)=>{
    res.send([
        {
            'mediName' : '감기약',
            'time' : '18:00',
            'text' : 'hi'
        }
    ])
})

app.listen(port,()=>console.log("listen"))