import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import recipeRoute from "./routes/recipe.js";
import userRoute from "./routes/user.js";
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/recipes", recipeRoute);
app.use("/user", userRoute);
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Success!"))
  .catch((err) => console.error("Failed:", err));

app.listen(PORT, () => {
  console.log("The server is working on the port", PORT);
});
