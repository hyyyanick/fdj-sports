import Team from "../models/team.model";

export const getTeamWithPlayers = async (
  teamId: string,
  limit: number,
  page: number
) => {
  try {
    const team = await Team.findById(teamId).populate({
      path: "players",
      options: { limit, skip: (page - 1) * limit },
    });
    return team;
  } catch (error) {
    throw error;
  }
};
