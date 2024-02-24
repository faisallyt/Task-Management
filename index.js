const express = require("express");
const app= express();
const  userRouter=require("./routes/user");

app.use(express.json());

app.use('/user',userRouter);


app.listen(3000,()=>{
    console.log("server started at PORT 3000");
})