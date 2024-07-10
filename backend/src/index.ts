import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import logger from "./middleware/logger.js";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";

const app = express();

const frontendOrigin = process.env.FRONTEND_ORIGIN;

if (!frontendOrigin) {
  throw new Error("Environment variable FRONTEND_ORIGIN is not specified.");
}

if (!process.env.NODE_ENV || process.env.NODE_ENV == "development") {
  app.use(logger);
}

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
