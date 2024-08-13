import mongoose, { Schema } from "mongoose";
import { Player } from "../interfaces/player.interface";

const LeagueSchema = new Schema<Player>({
  name: {
    type: String,
    required: true,
  },

  position: {
    type: String,
    required: true,
  },

  thumbnail: String,
  born: Date,
});

const League = mongoose.model("League", LeagueSchema);

module.exports = League;
