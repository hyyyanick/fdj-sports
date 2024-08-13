import mongoose, { Schema } from "mongoose";
import { League } from "../interfaces/league.interface";

const LeagueSchema = new Schema<League>(
  {
    name: {
      type: String,
      required: true,
    },

    sport: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const LeagueModel = mongoose.model("League", LeagueSchema);
