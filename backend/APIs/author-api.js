// create a mini express app..
const exp=require('express')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const verifyToken = require('../Middlewares/verifyToken')
require('dotenv').config()
const authorapp=exp.Router()


let authorCollection;
let articlesCollection;

//middleware function for db object

authorapp.use(expressAsyncHandler((req,res,next)=>{
    authorCollection=req.app.get('authorCollection');
    articlesCollection=req.app.get('articlesCollection');
    next();
  }))


// author registration

authorapp.post('/authors',expressAsyncHandler(async(req,res)=>{
    //get author body from req..
    const newAuthor=req.body;
    //check for duplicate...
    const dbUser=await authorCollection.findOne({username:newAuthor.username})
    if(dbUser!==null)
    {
        res.send({message:"Username already exists..."})
    }
    else{
        //hash the password...
       const hashedpassword=await bcryptjs.hash(newAuthor.password,8);
       //replace plain password with hashed pswd..
       newAuthor.password=hashedpassword;
       //save the author
       await authorCollection.insertOne(newAuthor)

       res.send({message:"User created successfull",payload:newAuthor})

    }
    }))


// author login...

authorapp.post('/login',expressAsyncHandler(async(req,res)=>{
    const authorCred=req.body;
    const dbUser=await authorCollection.findOne({username:authorCred.username})
    if(dbUser===null)
    {
        res.send({message:"Invalid Username..."})
    }
    else{
     const status=await bcryptjs.compare(authorCred.password,dbUser.password)
     if(status===false)
     {
        res.send({message:"Invalid password..."})
     }
     else{
        const signedToken=jwt.sign({username:dbUser.username},process.env.SECURITY_KEY,{expiresIn:'1d'})
        res.send({message:"Login Success",token:signedToken,user:dbUser})
     }
    }
}));


//view articles route...




//adding new articles...

authorapp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get the article...
    const newArticle=req.body;
    console.log(newArticle);
    //save to db
    await articlesCollection.insertOne(newArticle);
    //send response
    res.send({message:"New article created"})

}))


//modify article by author
authorapp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
   //get modified article from client
   const modifiedArticle=req.body;
   
   //update by article id
  let result= await articlesCollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
   let latestArticle=await articlesCollection.findOne({articleId:modifiedArticle.articleId})

    res.send({message:"Articel modified....",article:latestArticle})
}))


//soft delete arcticle by id
authorapp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articleId from url
    const artileIdFromUrl=(+req.params.articleId);
    //get article 
    const articleToDelete=req.body;

    if(articleToDelete.status===true){
       let modifiedArt= await articlesCollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
       res.send({message:"article deleted",payload:modifiedArt.status})
    }
    if(articleToDelete.status===false){
        let modifiedArt= await articlesCollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
        res.send({message:"article restored",payload:modifiedArt.status})
    }
    
}))

//read articles of author
authorapp.get('/article/:username',verifyToken,expressAsyncHandler(async(req,res)=>{

    const Username=req.params.username;

    //fetch all articles from db
    const ArticleList=await articlesCollection.find({username:Username}).toArray()
    console.log(ArticleList);
    //send ress
    res.send({message:"List of articles..",payload:ArticleList})

}))



module.exports=authorapp;