//create a express app
const exp=require('express')
const app=exp()
require('dotenv').config()
const MongoDb=require('mongodb').MongoClient
const path=require('path')
const cors=require("cors");


//deploy react to my server...
app.use(exp.static(path.join(__dirname,'../client/build')))

MongoDb.connect(process.env.DB_URL)
.then(client=>{
    //get db object
    const dbObj=client.db('BlogAppDB')
    //get collection object
    const userCollection=dbObj.collection('users')
    const authorCollection=dbObj.collection('authorCollection')
    const articlesCollection=dbObj.collection('articlesCollection')
    const AdminCollection=dbObj.collection('AdminCollection');
    //provide to all other files...
    app.set('userCollection',userCollection)
    app.set('authorCollection',authorCollection)
    app.set('articlesCollection',articlesCollection)
    app.set('AdminCollection',AdminCollection);


    console.log("DB connect success")
})
.catch(err=>console.log("Error ocurred in DB connection..."))



//to parse the body of req
app.use(exp.json())




//import API routes
const userapp=require('./APIs/users-api')
const authorapp=require('./APIs/author-api')
const adminapp=require('./APIs/admin-api')


//if path starts with user-api , send req to userapp
app.use('/user-api',userapp)

//if path starts with author-api , send req to authorapp
app.use('/author-api',authorapp)

//if path starts with admin-api , send req to adminapp
app.use('/admin-api',adminapp)


//deals with page refresh...
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

//error handling
app.use((err,req,res,next)=>{
    res.send({message:"Eroor occured..."})
})
//port 
const port=process.env.PORT;

app.listen(port,()=>{console.log("Server running at port ",port)}) 