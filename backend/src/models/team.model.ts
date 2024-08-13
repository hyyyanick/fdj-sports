import mongoose, { Schema } from "mongoose";
import { Team } from "../interfaces/team.interface";
import Player from "./player.model";

const TeamSchema = new Schema<Team>({
  name: {
    type: String,
    required: true,
  },
  thumbnail: String,
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: Player,
    },
  ],
});

const Team = mongoose.model("Team", TeamSchema);

export default Team;
