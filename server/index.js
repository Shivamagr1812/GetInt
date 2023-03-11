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

app.post("/login",async(req,res)=>{
    studentModel.find({userName: req.body.userName}).then((result)=>{
      const user = result;
      res.send(result); 
      console.log("User found.");
    }).catch((err)=>{
        res.send(err)
    })

    try{
        if(await bcrypt.compare(req.body.password,user.password)){
            res.send("Success")
        }
        else{
            res.send("Password incorrect")
        }
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

app.get("/read",async(req,res)=>{
    internModel.find({}).then((result)=>{
        res.send(result);
        console.log("result sent.")
    })
    .catch((err)=>{
        res.send(err)
    })
});

app.listen(3001,()=>{
    console.log("Running...");
});