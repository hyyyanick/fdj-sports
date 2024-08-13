import Team from "../models/team.model";

export const getTeamWithPlayers = async (teamId: string) => {
  try {
    const team = await Team.findById(teamId).populate("players");
    console.log(team);
    return team;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
