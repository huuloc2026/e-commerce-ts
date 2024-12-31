import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "50kb", extended: true }));
app.use(cookieParser());


export default app;