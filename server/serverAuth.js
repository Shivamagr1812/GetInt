function generateAccessToken (user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
}

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
            const accessToken = generateAccessToken(user)
            res.send("Success")
        }
        else{
            res.send("Password incorrect")
        }
    } catch{
        res.status(500).send()
    }    
})