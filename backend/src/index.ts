import cors from "cors";
import "dotenv/config";
import express from "express";
import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
