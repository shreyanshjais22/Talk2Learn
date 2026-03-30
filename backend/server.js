import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import chatRoutes from "./routes/chatRoute.js";
import connectDB from "./config/connectDB.js";

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(
  cors({
    origin: "https://talk2learn-hvs7.vercel.app/",
    credentials: true, 
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the Talk2Learn!');
    }
);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
