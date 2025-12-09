const AzureLib = require("../library/AzureLib");
const TranscriptionHistory = require("../models/TranscriptionHistory");
class transcriptionService {
  async transcribeAudio(audioUrl) {
    try {
      const transcription = "This is a sample transcribed text mocked locally.";
      const inserted = await TranscriptionHistory.insertOne({
        audioUrl,
        transcription,
      });
      return {
        status: true,
        message: "Transcription completed successfully.",
        data: { _id: inserted._id },
      };
    } catch (error) {
      return {
        status: false,
        message: "Error during transcription: " + error.message,
      };
    }
  }

  async getTranscriptions() {
    try {
      //calculate date 30 days ago
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      //fetch all transcriptions only those created in the last 30 days
      const transcriptions = await TranscriptionHistory.find(
        { createdAt: { $gte: thirtyDaysAgo } },
        { audioUrl: 1, transcription: 1, createdAt: 1 }
      ).sort({ createdAt: -1 });
      return {
        status: true,
        message: "Transcription fetched successfully.",
        data: { transcriptions },
      };
    } catch (error) {
      return {
        status: false,
        message: "Error fetching transcriptions: " + error.message,
      };
    }
  }

  async transcribeAudioWithAzure(audioUrl) {
    try {
      const transcription = await AzureLib.transcribeAudio(audioUrl);
      const inserted = await TranscriptionHistory.insertOne({
        audioUrl,
        transcription,
        source: "azure",
      });
      return {
        status: true,
        message: "Transcription completed successfully.",
        data: { _id: inserted._id },
      };
    } catch (error) {
      return {
        status: false,
        message: "Error during transcription: " + error.message,
      };
    }
  }
}

module.exports = new transcriptionService();
