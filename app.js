import Express from "express";
import userRouter from "./router/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./Middlewares/error.js";
import cors from "cors";

export const app = Express();

config()

// using middleware
app.use(Express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://data-insights-frontend.vercel.app",
    credentials: true,
})
);

// Using routes
app.use( "/api/v1/users" ,userRouter);

app.get("/" , (req, res)=> {
    res.send("Nice Working");
})

app.use(errorMiddleware);

