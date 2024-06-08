// create a mini express app... 
const exp=require('express')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const verifyToken = require('../Middlewares/verifyToken')
require('dotenv').config()

const adminapp = exp.Router();

let AdminCollection;
let userCollection;
let authorCollection;

adminapp.use(expressAsyncHandler((req, res, next) => {
    AdminCollection = req.app.get('AdminCollection');
    userCollection=req.app.get('userCollection');
    authorCollection=req.app.get('authorCollection');
    next();
}));


// admin registration

adminapp.post('/admin',expressAsyncHandler(async(req,res)=>{
    //get author body from req..
    const newAdmin=req.body;
    //check for duplicate...
    const dbUser=await AdminCollection.findOne({username:newAdmin.username})
    if(dbUser!==null)
    {
        res.send({message:"Username already exists..."})
    }
    else{
        //hash the password...
      // const hashedpassword=await bcryptjs.hash(newAdmin.password,8);
       //replace plain password with hashed pswd..
      // newAdmin.password=hashedpassword;
       //save the author
       await AdminCollection.insertOne(newAdmin)

       res.send({message:"Admin created successfull",payload:newAdmin})

    }
    }))






//admin login 

adminapp.post('/login',expressAsyncHandler(async(req,res)=>{
    const adminCred=req.body;
    const dbUser=await AdminCollection.findOne({username:adminCred.username})
    console.log(dbUser);
    if(dbUser===null)
    {
        res.send({message:"Invalid Username..."})
    }
    else{
    // const status=await bcryptjs.compare(adminCred.password,dbUser.password)
    
     if(adminCred.password!==dbUser.password)
     {
        res.send({message:"Invalid password..."})
     }
     else{
        const signedToken=jwt.sign({username:dbUser.username},process.env.SECURITY_KEY,{expiresIn:'1d'})
        res.send({message:"Login Success",token:signedToken,user:dbUser})
     }
    }
}))

//users list

adminapp.get('/users', verifyToken, expressAsyncHandler(async (req, res) => {
    try {
        const users = await userCollection.find({}, { username: 1, _id: 0 }).toArray(); // Projection to only retrieve the username field
        const usernames = users.map(user => user.username); // Extracting usernames from documents
        res.status(200).json({ users: usernames }); // Sending response with usernames
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal server error." });
    }
}));


//authors list

adminapp.get('/authors',verifyToken,expressAsyncHandler(async(req,res)=>{
    const author=await authorCollection.find({},{username:1,_id:0}).toArray();
    const authorsList=author.map(author=>author.username);
    res.send({author:authorsList})
}))


//delete author
adminapp.delete('/delete-author',verifyToken,expressAsyncHandler(async(req,res)=>{
    const author=req.body;
    let dbres=await authorCollection.findOneAndDelete({username:author.username})
    if(dbres!==null)
    {
       res.send({message:"Author deleted successfull"})
    }
    else{
        res.send({message:"Author not found / unable to delete "})
    }
}))

//delete user
adminapp.delete('/delete-user',verifyToken,expressAsyncHandler(async(req,res)=>{
    const user=req.body;
    let dbres=await userCollection.findOneAndDelete({username:user.username})
    if(dbres!==null)
    {
       res.send({message:"User deleted successfull"})
    }
    else{
        res.send({message:"Author not found / unable to delete "})
    }
}))

//edit user details
adminapp.put('/edit-user',verifyToken,expressAsyncHandler(async(req,res)=>{
    let EditedUser=req.body;
    let dbres=await userCollection.findOneAndUpdate({username:EditedUser.username},{$set:{...EditedUser}},{returnDocument:"after"})
    console.log(dbres);
    if(dbres!==null)
    {
        res.send({message:"User details Edited Successfull",user:dbres})
    }
    else{
        res.send({message:"User not found / unable to edit "})
    }
}))

//edit author details
adminapp.put('/edit-author',verifyToken,expressAsyncHandler(async(req,res)=>{
    let EditedUser=req.body;
    let dbres=await authorCollection.findOneAndUpdate({username:EditedUser.username},{$set:{...EditedUser}},{returnDocument:"after"})
    console.log(dbres);
    if(dbres!==null)
    {
        res.send({message:"Author details Edited Successfull",user:dbres})
    }
    else{
        res.send({message:"User not found / unable to edit "})
    }
}))




//delete article
//soft delete arcticle by id
adminapp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
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
    






module.exports = adminapp;
