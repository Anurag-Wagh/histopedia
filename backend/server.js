const express = require("express")
const app = express()
app.use(express.json())
require("dotenv").config()
const mongoose = require("mongoose")
app.use(express.json());
const cors = require("cors");

// CORS configuration
const corsOptions = {
  origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
const userRouter = require("./routes/users");
const cityRouter = require("./routes/cities");

connectDB();
app.listen(process.env.PORT || 5000, console.log("Server Listening"))

app.use("/users", userRouter)
app.use("/cities", cityRouter)

async function connectDB (){
    try {
        const mongoURI = process.env.MONGODB_URI || "mongodb+srv://anu:r66n2ef0WerhGCwp@cluster0.p6yjrwk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.error("MongoDB connection error:", error)
        process.exit(1);
    }
}
