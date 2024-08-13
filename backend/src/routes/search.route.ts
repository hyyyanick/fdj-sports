import { Router, Request, Response } from "express";
import { LeagueModel } from "../models/league.model";

const router = Router();

// Get all players
router.get("/", async (req: Request, res: Response) => {
  const query = req.query.q;
  const league = await LeagueModel.findOne({ name: { $regex: query } });
  res.status(200).json(league);
});

export default router;
