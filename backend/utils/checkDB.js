import supabase from "../config/supabaseClient.js";

export const checkDB = async () => {
try {
    const {error} = await supabase.from("users").select("id").limit(1);
    if(error){
        console.log("Database connection failed");
        process.exit(1);
    }
    console.log("Database connected successfully");
} catch (error) {
    console.log(error)
}
}