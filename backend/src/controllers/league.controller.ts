import League from "../models/league.model";

export const getLeague = async (query: string) => {
  try {
    return await League.findOne({ name: { $regex: query } });
  } catch (error) {
    throw error;
  }
};

export const getLeagueWithTeams = async (leagueName: string) => {
  try {
    const leagues = await League.findOne({ name: leagueName }).populate(
      "teams"
    );
    return leagues;
  } catch (error) {
    throw error;
  }
};
