import mongoose from "mongoose";

const Schema: any = mongoose.Schema;

// here's the schema for a football player with all necessary fields
const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    primaryPosition: {
      type: String,
      required: true,
    },
    positions: [
      {
        type: String,
        required: true,
      },
    ],
    club: {
      type: String,
      required: true,
    },
    jerseyNumber: {
      type: Number,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    matchesPlayed: {
      type: Number,
      required: true,
    },
    goalsScored: {
      type: Number,
      required: true,
    },
    assists: {
      type: Number,
      required: true,
    },
    yellowCards: {
      type: Number,
      required: true,
    },
    redCards: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Player = mongoose.model("Player", playerSchema);
export default Player;
