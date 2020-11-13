const express = require('express')
const schema = require('./schema.js')
const mongoose = require('mongoose')
const {graphqlHTTP}=require('express-graphql')
const cors = require('cors')
require('dotenv/config')

const app=express()

// mongoose connector
mongoose.connect(process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true }
)

mongoose .connection.once('open',()=>{
    console.log('DB connected')
})

// allow cross origin
app.use(cors())

// create graphQL schema middleware
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.use(express.static('public'))

app.get('*',(req,res)=>{
    res.sendFile(__dirname,'public','index.html')
})

app.listen(5000,()=>console.log('Server running...'))