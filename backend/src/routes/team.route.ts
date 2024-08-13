import { Router, Request, Response } from "express";
import { getTeamWithPlayers } from "../controllers/team.controller";

const router = Router();

// Get league by search keyword
router.get("/teamId/:id", async (req: Request, res: Response) => {
  try {
    const teamId = req.params.id;
    const team = await getTeamWithPlayers(teamId);
    return res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;