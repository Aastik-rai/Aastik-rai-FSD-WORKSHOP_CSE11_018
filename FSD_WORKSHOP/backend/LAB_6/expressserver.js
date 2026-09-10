import express from "express";
const app =express();
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
        name: "Abhay singhi",
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
        name: "Aayush sharma 2",
        phone: "7829326087",
        email: "Aayush@gmail.com"
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


app.post("/create",(req,res)=>{
    try{
        const{id,name,email}=req.body;
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
    }
});


// app.get("/registered",(req,res)=>{
//     res.status(200).json({
//         message:"welcome to express server ",
//     });
// });
// app.get("/user/:id",(req,res)=>{
//     res.status(200).json({
//         message: "abs",
//     });
// });

// app.get("/edit/:id",(req,res)=>{
//     res.status(200).json({
//         message:"welcome to express server ",
//     });
// });




app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
