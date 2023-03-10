require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const internModel = require("./Models/intern")
const studentModel = require("./Models/student")
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://shivam1812:atlas1812@cluster0.ghlhz8q.mongodb.net/Internships?retryWrites=true&w=majority",
{
    useNewUrlParser: true
});

app.post("/register",async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const user = {userName: req.body.userName , password: hashedPassword}
        const newUser = new studentModel({userName: user.userName, password: user.password})
        await newUser.save()
        res.status(201).send()
    } catch{
        res.status(500).send()
    }    
})


app.post("/insert",async(req,res)=>{
    console.log("Post made")
    const companyName = req.body.companyName;
    const jobRole = req.body.jobRole;
    const stipend = req.body.stipend;
    const cutoff = req.body.cutoff;

    const entry = new internModel({ CompanyName: companyName, JobRole: jobRole , Stipend: stipend, CutOff: cutoff});
    
    try{
        await entry.save();
        console.log("Entry Added!");
        res.send("");
    }
    catch(err){
        console.log(err)
    }
});

app.get("/read",authenticateToken,async(req,res)=>{
    internModel.find({}).then((result)=>{
        res.send(result);
        console.log("result sent.")
    })
    .catch((err)=>{
        console.log("Please log in")
        res.send(err)
    })
});

function authenticateToken(req,res,next){
    // console.log(req.headers)
    const authHeader=req.headers.authorization
    console.log(authHeader)
    const token=authHeader && authHeader.split(' ')[1];
    if(token==null){
        console.log("Token is null")
        return res.sendStatus(401)
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) res.sendStatus(403)
        req.user=user
        console.log(user)
        next()
     })
}

app.post("/login",async(req,res)=>{
    
    try{
        console.log("Tried.")
        const user=await studentModel.findOne({userName: req.body.userName})
        console.log("User....")
        if(!user){
            console.log("No such user exists")
            res.sendStatus(400);
        }
        const match=await bcrypt.compare(req.body.password,user.password)
        console.log(match)
        if(match){
            // console.log("matched")
            // console.log(user,process.env.ACCESS_TOKEN_SECRET)
            const token=jwt.sign({id: user._id},process.env.ACCESS_TOKEN_SECRET)
            res.json({user:user,token:token})
        }
        else{
            console.log("Password incorrect")
            res.send("Password incorrect")
        }
    } catch{
        res.status(500).send()
    }    
})

app.listen(3001,()=>{
    console.log("Running...");
});