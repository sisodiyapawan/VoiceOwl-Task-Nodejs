const mongoose = require("mongoose");

const TranscriptionHistory = new mongoose.Schema(
  {
    audioUrl: String,
    transcription: String,
    source: { type: String, default: "local" },
  },
  {
    timestamps: true,
  }
);

let modelName = collectionName = "TranscriptionHistory";
module.exports = mongoose.model(
  modelName,
  TranscriptionHistory,
  collectionName
);
