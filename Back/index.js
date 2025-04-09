import express from "express";
import "dotenv/config";
import cors from "cors";
import {connectDB} from "./connections/db.js"
// import profile from "./Models/ProfileModel.js";
import profileRouter from "./Routes/profileRouter.js";

const port = process.env.PORT
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const corsOption={
    origin:process.env.FRONTEND_URI,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}

app.use(cors(corsOption));

connectDB();
app.use("/profile",profileRouter)
app.listen(port,()=>{
    console.log("Server is started at "+port);
})
