import supabase from "../config/supabaseClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req,res) => {
    const {name,email,password} = req.body || {};
    if(!name || !email || !password){
        return res.status(400).json({message:"Name, Email and Password are required"})
    }
    const {data:existing, error:userError} = await supabase.from("users").select().eq("email",email).maybeSingle();
    if(userError){
        return res.status(500).json({message:"Error while checking existing user",error:userError.message})
    }
    if(existing){
        return res.status(409).json({message:"Email already exists"})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const payload = {name,email,password:hashedPassword}
    const {data,error} = await supabase.from("users").insert(payload).select().single();
    if(error){
        return res.status(500).json({message:"Error while inserting user",error:error.message})
    }
    res.status(201).json({message:"User created successfully",data:{
        name:data.name,
        email:data.email
    }})
}

export const login = async (req,res) => {
    const {email,password} = req.body || {};
    if(!email || !password){
        return res.status(400).json({message:"Email and Password are required"})
    }
    const {data:existing, error:userError} = await supabase.from("users").select().eq("email",email).maybeSingle();
    if(userError){
        return res.status(500).json({message:"Error while checking existing user",error:userError.message})
    }
    if(!existing){
        return res.status(404).json({message:"User not found"})
    }
    const isMatch = await bcrypt.compare(password,existing.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid Credentials"})
    }

    const token = jwt.sign(
        {id:existing.id,email:existing.email},
        process.env.JWT_SECRET,
        {expiresIn:"2h"}
    )
    res.status(200).json({message:"User Login successfully",data:{
        email:existing.email,
        token
    }})
}

