import express from "express";


const app = express();

app.use(express.json());

// routes import

import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

// Using routes
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/posts", postRoutes)



export default app;

