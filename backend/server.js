import express from "express"
import { checkDB } from "./utils/checkDB.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5632

app.listen(PORT, async ()=>{
    await checkDB();
    console.log(`Server is running on http://localhost:${PORT}`)
})