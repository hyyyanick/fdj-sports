import { Router, Request, Response } from "express";
import {
  getLeague,
  getLeagueWithTeams,
} from "../controllers/league.controller";

const router = Router();

// Get league by search keyword
router.get("/", async (req: Request, res: Response) => {
  try {
    const query = req.query.q;
    const league = await getLeague(query as string);
    return res.status(200).json(league);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/leagueName/:leagueName", async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);
    const league = await getLeagueWithTeams(req.params.leagueName, limit, page);
    return res.status(200).json(league);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
