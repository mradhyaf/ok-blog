import "dotenv/config";
import express from "express";
import db from "./repository/db.js";

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(db);
});
