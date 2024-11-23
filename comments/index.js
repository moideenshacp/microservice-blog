const express =require('express')
const app = express()
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

app.use(bodyParser.json())
app.use(cors())


const commentsByPostId = {}

app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.id] || [])
})


app.post('/posts/:id/comments',async (req,res)=>{
    const commentId = randomBytes(4).toString('hex')
    const {newComment} = req.body
    const {id} = req.params

    const comments = commentsByPostId[id] || []
    comments.push({id:commentId,newComment})
    commentsByPostId[id] = comments

    await axios.post('http://event-bus-srv:4005/events',{
        type:'CommentCreated',
        data:{
            id:commentId,
            newComment,
            postId:req.params.id
        }
    })

    res.status(201).send(comments)
})

app.post('/events',(req,res)=>{
    console.log('received event',req.body.type);
    res.send({})
})

app.listen(5000,()=>{
    console.log('server started at 5000');
    
})
