import mongoose, { Schema } from "mongoose";
import { Player } from "../interfaces/player.interface";

const PlayerSchema = new Schema<Player>({
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

const Player = mongoose.model("Player", PlayerSchema);

export default Player;
