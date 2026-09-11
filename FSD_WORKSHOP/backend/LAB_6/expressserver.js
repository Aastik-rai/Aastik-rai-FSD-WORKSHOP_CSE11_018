import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// dotenv.config();

const app =express();
app.use(express.json()); //to set a middleware called express.json  
const port=3000
const userData=[
    {
        id: 1,
        name: "Aastik Rai",
        phone: "7827536087",
        email: "aastik@gmail.com"
    },
    {
        id: 2,
        name: "Abhay singh",
        phone: "7845336087",
        email: "Abhay@gmail.com"
    },
    {
        id: 3,
        name: "Aayush sharma",
        phone: "2937536087",
        email: "Aayush@gmail.com"
    },
    {
        id: 4,
        name: "Abhishek dubey",
        phone: "7827893273",
        email: "dubey@gmail.com"
    }

    
];
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"welcome to user ",
    });
});
app.get("/user",(req,res)=>{
    try {
        res.status(200).json({
        message:"data recieved",userData
        });
    }catch(err){
        console.log("error",err.message)
    }

});


app.get("/user/:id",(req,res)=>{
    try{
        const id=req.params.id;
        const user=userData.find((u) => u.id==id);
        if(!user){
            return res.status(400).json({message:"user not found "})
        }
        res.status(200).json({message:"data recieved",user});

    }catch(err){
        console.log("error",err.message);
    }   
});


app.post("/create",(req,res)=>{
    try{
        const{name,email}=req.body;
        const newUser={
            id:userData.length+1,
            name,
            email,
        };
        userData.push(newUser);
        res.status(201).json({
        message:"user created successfully",newUser
        });

    }catch(err){
        console.log("error",err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// app.get("/registered",(req,res)=>{
//     res.status(200).json({
//         message:"welcome to express server ",
//     });
// });


// app.get("/edit/:id",(req,res)=>{
//     res.status(200).json({
//         message:"welcome to express server ",
//     });
// });


// app.post("/login",(req,res)=>{

// });





app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
