import express from "express";

const app=express();




app.get("/",(req,res)=>{
    res.json({
        what:"hey there",
    })
})


app.listen(8000,()=>{
    console.log("app is listening on port 8000");
})