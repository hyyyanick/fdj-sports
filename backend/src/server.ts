import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/search.route";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

const PORT = 5000 || process.env.PORT;
const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/fdj-sports");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
connect();

app.get("", (req: Request, res: Response) => {
  res.send("Hello");
});

app.use("/api/search", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
