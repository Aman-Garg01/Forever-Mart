import express from "express"
import cors from "cors"
import 'dotenv/config'
import { connectDB } from "./config/db.js"
import clothRouter from "./routes/clothRoutes.js"
import connectCloudinary from "./config/Cloudinary.js"
import userRouter from "./routes/userRouter.js"
import cartRouter from "./routes/Cartroutes.js"
import orderRouter from "./routes/orderRoute.js"


// app config

const app = express()
const port = process.env.PORT || 4100

// db connection
connectDB();
connectCloudinary()

// middleware

app.use(express.json())
app.use(cors())


// api endpoints

app.use('/api/user',userRouter)
app.use("/api/cloth", clothRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get("/", (req, res) => {
    res.send("Api working")
})

app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
})


