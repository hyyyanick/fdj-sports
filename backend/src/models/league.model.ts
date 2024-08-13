import mongoose, { Schema } from "mongoose";
import { League } from "../interfaces/league.interface";
import Team from "./team.model";

const LeagueSchema = new Schema<League>({
  name: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: Team,
    },
  ],
});

const League = mongoose.model("League", LeagueSchema);
export default League;
