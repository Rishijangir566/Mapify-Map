import express from "express";
import { createProfile, deleteProfile, fetchProfile, fetchProfiles, updateProfile } from "../controller/profile.js";
import upload from "../Middleware/multer.js"

const profileRouter = express.Router();

profileRouter.post("/addprofile",upload.single("image") ,createProfile)
profileRouter.get("/fetch",fetchProfile)
profileRouter.get("/fetch/:id",fetchProfiles)
profileRouter.delete("/deleteprofile/:id",deleteProfile)
profileRouter.put("/updateprofile/:id",upload.single("image") ,updateProfile)

export default profileRouter
