const express = require('express')
const app = express()
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios  = require('axios')
const { type } = require('os')



app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts',(req,res)=>{
    res.send(posts)

})


app.post('/posts/create',async(req,res)=>{ 
    const id = randomBytes(4).toString('hex')
    const {title} = req.body
    const {content} = req.body

    posts[id] = {
        id,title,content
    }
    await axios.post('http://event-bus-srv:4005/events',{
        type:"postCreated",
        data:{
            id,title,content
        }
    })
     res.status(201).send(posts[id ])
})

app.post('/events',(req,res)=>{
    console.log('received event',req.body.type);
    res.send({})
})

app.listen(4000,()=>{
    console.log('listening on 4000');
})