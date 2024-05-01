const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 4000; //포트 번호

app.unsubscribe(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
 
app.get('/MyPage/:id',(res,req)=>{
  const q = req.params
})

app.get('/list',(req,res)=>{ //list 경로
    res.send([
        {
            'mediName' : '감기약',
            'time' : '18:00',
            'text' : 'hi'
        },
        {
            'mediName' : '복통약'
        }
    ])
})

app.listen(port,()=>console.log("listen"))