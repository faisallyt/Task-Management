const zod=require("zod");
const userSignUp=zod.object({
    username:zod.string(),
    password:zod.string().min(8),
    name:zod.string()
});

const userSignIn=zod.object({
    username:zod.string(),
    password:zod.string(),
})

const auth=zod.string();

const taskId=zod.string();


module.exports={
   userSignUp,
   userSignIn,
   auth,
   taskId
}