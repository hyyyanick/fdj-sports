import { Router, Request, Response } from "express";
import { getTeamWithPlayers } from "../controllers/team.controller";

const router = Router();

// Get player list
router.get("/teamId/:id", async (req: Request, res: Response) => {
  try {
    const teamId = req.params.id;
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);
    const team = await getTeamWithPlayers(teamId, limit, page);
    return res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
