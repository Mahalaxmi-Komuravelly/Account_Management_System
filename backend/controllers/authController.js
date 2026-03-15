import supabase from "../config/supabaseClient";
import bcrypt from "bcrypt";

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