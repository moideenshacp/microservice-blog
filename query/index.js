const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())


const posts = {}

const handleEvent =(type,data)=>{
    if(type === 'postCreated'){
        const {id,title,content} = data
        posts[id] = {id,title,content,comments:[]}

    }
    if(type ===  'CommentCreated'){

        const {id, newComment,postId} = data
        const post = posts[postId]
        post.comments.push({id,newComment})
    }
}

app.get('/posts',(req,res)=>{

    res.send(posts)

})

app.post('/events',(req,res)=>{
    const {type,data} = req.body
    handleEvent(type,data)

    res.send({})
    
})

app.listen(4002,async()=>{
    console.log('started on 4002')

    const res = await axios.get('http://event-bus-srv:4005/events');

    for(let event of res.data){
        console.log('proceesing event :',event.type);
        handleEvent(event.type,event.data)
    }
})
