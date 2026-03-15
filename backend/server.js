import express from "express"
import { checkDB } from "./utils/checkDB.js";
import { AuthRouter } from "./routes/authRoutes.js";
import cors from "cors";

const app = express();
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true,
    }
))
app.use(express.json());
app.use("/api",AuthRouter);

const PORT = process.env.PORT || 5632

app.listen(PORT, async ()=>{
    await checkDB();
    console.log(`Server is running on http://localhost:${PORT}`)
})