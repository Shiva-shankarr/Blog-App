//create a mini express app
const exp=require('express')
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const userapp=exp.Router()
const verifyToken=require('../Middlewares/verifyToken')
require('dotenv').config()


let userCollection;
let articlesCollection;
//middleware for getting db object
userapp.use((req,res,next)=>{
    userCollection=req.app.get('userCollection')
    articlesCollection=req.app.get('articlesCollection');
    next();
})


//registration route 

userapp.post('/users',expressAsyncHandler(async(req,res)=>{
    //get body from req
    const newUser=req.body
    console.log(newUser)
    //check for is there any duplicate ....
    const dbres=await userCollection.findOne({username:newUser.username})
    if(dbres!==null)
    {
        res.send({message:"User already exists..."})
    }
    else
    {
        //hash the password...
        const hashedPassword= await bcryptjs.hash(newUser.password,7)
        //replace password with plain password...
        newUser.password=hashedPassword;
        //save the user
       const newdbUser=await userCollection.insertOne(newUser);//insertOne method return boolean value if inserted...
      res.send({message:"User created successfull"})
       //    if(newdbUser===false)
    //    {
    //     res.send({message:"Something went wrong user not created"})
    //    }
    //    else{
    //     res.send({message:"User created successfull",payload:newdbUser})
    //    }

    }
}))


//user login route...

userapp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get body from req
    const userCred=req.body;
    console.log(userCred)
    //verify the user if exists or not
    const dbUser=await userCollection.findOne({username:userCred.username})
    //if user not found
    if(dbUser===null)
    {
        res.send({message:"Invalid Username..."})
    }
    else //if user found
    {
    //compare the password
    const status=await bcryptjs.compare(userCred.password,dbUser.password)
    //if password  not match
    if(status===false)
    {
        res.send({message:"Invalid password..."})
    }//create jwt token
    else{
        const signedToken=jwt.sign(
            {username:dbUser.username}
            ,process.env.SECURITY_KEY,
            {expiresIn:'1d'})

        res.send(
            {
            message:"Login Success",
            token:signedToken,
            user:dbUser
        }
            )
    }
   
    }
}))


//get all articles...
userapp.get('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
  let ArticleList=await articlesCollection.find({status:true}).toArray();
  //send res..
  res.send({message:"Articles",payload:ArticleList})

}))


//post comment....
userapp.post('/comment/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
  const idFromUrl=(+req.params.articleId);
  const Obj=req.body;
  //post the comment ..
  let result=await articlesCollection.updateOne({articleId:idFromUrl},{$addToSet:{comments:Obj}});

  console.log(result);
  res.send({message:"Comment posted..."})
}))





module.exports=userapp