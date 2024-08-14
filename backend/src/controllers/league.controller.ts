import League from "../models/league.model";

export const getLeague = async (query: string) => {
  try {
    return await League.findOne({ name: { $regex: query } });
  } catch (error) {
    throw error;
  }
};

export const getLeagueWithTeams = async (
  leagueName: string,
  limit: number,
  page: number
) => {
  try {
    const leagues = await League.findOne({ name: leagueName }).populate({
      path: "teams",
      options: { limit, skip: (page - 1) * limit },
    });
    return leagues;
  } catch (error) {
    throw error;
  }
};
