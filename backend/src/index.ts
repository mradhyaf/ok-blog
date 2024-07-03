import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";

const app = express();

const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: frontendOrigin, credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET || ["sunflower,tennis,books"],
    cookie: { maxAge: 60000 * 60 * 2 },
    saveUninitialized: false,
    resave: false,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
