import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import leagueRoute from "./routes/league.route";
import teamRoute from "./routes/team.route";
import config from "./config/config";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

const PORT = config.port;
const connect = async () => {
  try {
    // await mongoose.createConnection(config.db_uri, {
    //   authSource: "admin",
    //   user: config.db_options.user,
    //   pass: config.db_options.pass,
    // });
    await mongoose.connect(config.db_uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
connect();

app.get("", (req: Request, res: Response) => {
  res.send("Hello");
});

app.use("/api/league", leagueRoute);
app.use("/api/team", teamRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
