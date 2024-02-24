const express=require("express");
const userMiddleware=require("../middlewares/user");
const jwt=require("jsonwebtoken");
const {User,Task}=require("../db/index")
const router=express.Router();
const {JWT_SECRET}=require("../config")



router.post('/signup',async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const name=req.body.name;
    
    const ifUser= await User.findOne({
        username:username
    })
    if(!ifUser){
        await User.create({
            username:username,
            password:password,
            name:name
        });

        res.json({
            message:'user Created Succesfully',
        })
    }
    else{
        res.status(409).json({
            message:'oops There is already an account with this credentials',
        })
    }

});

router.post('/signin',async(req,res)=>{
   const username=req.body.username;
   const password=req.body.username;

   const user=await User.find({
        username:username,
        password:password
   })

   if(user){
        const token=jwt.sign({
            username
        },JWT_SECRET);

        res.json({
            message:'succesfully logged in',
            token:token
        })
   }
   else{
       res.status(401).json({
          message:'wrong login credentials',
       })
   }
})

router.post('/createTask',userMiddleware,async(req,res)=>{
    const username=req.username;
    const title=req.body.title;
    const description=req.body.description;
    const created=req.body.created;
    const dueDate=req.body.dueDate;

    await Task.create({
        title,
        description,
        created,
        lastUpdated:created,
        dueDate
    })
    res.json({
        message:"task added succesfully",
    })
})

router.get('/tasks',userMiddleware,async(req,res)=>{
    const response=await Task.find({});

    res.json({
        response
    })
})

router.put('/update/:taskId',userMiddleware,async(req,res)=>{
    const taskId=req.params.taskId;
    const username=req.username;
    const lastUpdated=req.body.lastUpdated;

    await Task.updateOne({
        _id:taskId,
    },{
        lastUpdated:lastUpdated,
    });

    res.json({
        message:"updated Succesfully",
    })
})

router.delete('/delete/:taskId',userMiddleware,async(req,res)=>{
    const taskId=req.params.taskId;
    
    const validate=await Task.findOne({
        _id:taskId
    })

    if(validate){
        await Task.deleteOne({
            _id:taskId
        })
    
        res.json({
            message:"task deleted succesfully"
        })

    }
    else{
        res.status(404).json({
            error:"Task not found",
        })
    }
})



module.exports=router;


