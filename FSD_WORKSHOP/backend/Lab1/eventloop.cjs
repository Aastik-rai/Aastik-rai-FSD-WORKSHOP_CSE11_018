console.log("This is starting point of my code ");

setTimeout(()=>{
    console.log("This is the first timeout operation");
},10000);
console.log("This is the end point of my code ");
setTimeout(()=>{
    console.log("this is second timeout operation");
},5000);

process.nextTick(()=>{ 
    console.log("This is process.nextTick operation");
})

new Promise((resolve,reject)=>{
    let success=true;
    if(success)
        resolve("Data Loaded Succesfully");
    else 
        reject("Data loading failed ")
}).then((message)=>{
    console.log(message);
}).catch((message)=>{
    console.log(message);
});
console.log("this is the starting point of my code ");
console.log("this is the end point of my code")


