require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const app = express();

const internModel = require("./Models/intern")
const studentModel = require("./Models/student")
const applicationModel = require("./Models/application")
const companyModel = require("./Models/company")
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL,
{
    useNewUrlParser: true
});

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

// File Upload
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

// Student Registration

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

// Company Registration

app.post("/registerCompany",async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const user = {name: req.body.userName , password: hashedPassword}
        const newUser = new companyModel({username: user.name, password: user.password})
        await newUser.save()
        res.status(201).send()
    } catch{
        res.status(500).send()
    }    
}
)

// Add New Internships

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

// New Applications

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

app.post("/apply",upload.single('resume'),async(req,res)=>{
    // console.log(req);
    const name = req.body.name;
    const email = req.body.email;
    const branch = req.body.branch;
    const role = req.body.role;
    var entry;

    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        console.log(cldRes.url);
        var resume = "";
        resume = cldRes.url;
        entry = new applicationModel({ Name: name, Email: email , Branch: branch, Role: role, Resume: resume});
        // res.json(cldRes);
    } catch (error) {
        console.log(error);
        res.send({
        message: error.message,
        });
    }

    // const entry = new internModel({ Name: name, Email: email , Branch: branch, Role: role, Resume: resume});
    
    try{
        await entry.save();
        console.log("Entry Added!");
        res.send("");
    }
    catch(err){
        console.log(err)
    }
});

// View Internships

app.get("/read",authenticateUser,async(req,res)=>{
    internModel.find({}).then((result)=>{
        res.send(result);
        console.log("result sent.")
    })
    .catch((err)=>{
        console.log("Please log in")
        res.send(err)
    })
});

// Student Authentication

function authenticateUser(req, res, next) {
  console.log(req.headers)
  const authHeader = req.headers.authorization
  console.log(authHeader)
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    console.log("Token is null")
    return res.sendStatus(401)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err)
      return res.sendStatus(403)
    }
    req.user = user
    console.log(user)
    if(user.isUser==false){
        console.log("User is not a student")
        return res.sendStatus(403)
    }
    next()
  })
}

// View Applications

app.get("/readApplications",authenticateCompany,async(req,res)=>{
    applicationModel.find({}).then((result)=>{
        // console.log(result);
        res.send(result);
        console.log("result sent.")
    })
    .catch((err)=>{
        console.log("Please log in")
        res.send(err)
    })
}
);

// Company Authentication

function authenticateCompany(req, res, next) {
    console.log(req.headers)
    const authHeader = req.headers.authorization
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        console.log("Token is null")
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
        console.log(err)
        return res.sendStatus(403)
        }
        req.user = user
        console.log(user)
        if(user.isUser==true){
            console.log("User is not a company")
            return res.sendStatus(403)
        }
        next()
    })
}

// Student Login

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
            const token=jwt.sign({id: user._id, isUser: true},process.env.ACCESS_TOKEN_SECRET)
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

// Company Login

app.post("/loginCompany",async(req,res)=>{
    
    try{
        console.log("Tried.")
        const user=await companyModel.findOne({username: req.body.userName})
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
            const token=jwt.sign({id: user._id, isUser: false},process.env.ACCESS_TOKEN_SECRET)
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