import mongoose from "mongoose";
import profile from "../Models/ProfileModel.js";
import uploadToCloudinary from '../Middleware/cloudinary.js'


export async function createProfile(req, res) {
  try {
    const file = req.file;
    if (!file) return res.status(404).send({ message: "file not Found" });
    const secure_url=await uploadToCloudinary(req);

    const existingProfile = await profile.findOne({ Phone: req.body.number });
    if (existingProfile) {
      return res
        .status(400)
        .send({ message: "A profile with number already exists" });
    }
   
    const newProfile= new profile({
        ...req.body,
        image:secure_url
    });
    await newProfile.save();
    res.status(201).send("profie Created")

  } catch (error) {
    res
      .status(500)
      .send({ message: "Profile not Added ", Error: error.message });
  }
}


export async function fetchProfiles(req,res){
    try{

const profiles =await profile.find({})
  if(!profiles){
    return res.status(500).send({message: "No profile found"})
  } 
  return res.status(200).send({profiles}) 

    }catch(error){
        res.status(400).send({message:"Couldn't fetch profiles",Error:error.message})
    }
}

export async function fetchProfile(req, res) {
    try {
      const { id } = req.params;
      const singleProfile = await profile.findById(id);
      if (!singleProfile)
        return res.status(404).send({ message: "Profile not found", erroe:error.message });
      return res.status(200).send({ profile: singleProfile });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Couldn't fetch profile", error:error.message });
    }
  }

export async function deleteProfile(req,res){
    try{
        const {id}=req.params;
        if(!id)return res.status(404).send({message:"No Id found"})

        let profileToDelete = await profile.findByIdAndDelete(id);
        // console.log(profileToDelete);

        if(!profileToDelete)return res.status(400).send({message:"could not delete the profile"})

         return   res.status(200).send({message:"Profile deleted successfully "})
            
    }catch(error){
        res.status(400).send({message:"Failed to delete profiles",Error:error.message})
    }
}

export async function updateProfile(req,res){
    try{
     const file =req.file;
     const {id}=req.params;
     if (!file) return res.status(404).send({ message: "File Not Found" });
     if (!id) return res.status(404).send({ message: "No Id Found" });
     const secural_url=await uploadToCloudinary(req)

    const updateProfile = await profile.findByIdAndUpdate(
        id,
        {...req.body,image:secural_url},
        {new:true}
    ) ;
    if(!updateProfile){
        return res.status(404).send({ message: "Profile not found" });  
    }
    return   res.status(200)
    .send({ message: "Profile updated", profile: updateProfile });

    }catch(error){
        res.status(400).send({message:"Failed to update the profiles",Error:error.message})
    }
}