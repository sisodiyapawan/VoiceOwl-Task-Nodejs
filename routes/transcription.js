var express = require("express");
var router = express.Router();
const transcriptionService = require("../services/transcriptionService");
const responseHandler = require("../middleware/responseHandler");
const securityCheck = require("../middleware/securityCheck");

router.post("/transcription", securityCheck, async function (req, res) {
  const response = await transcriptionService.transcribeAudio(
    req.body.audioUrl
  );
  await responseHandler.handleServiceResponse(req, res, response);
});

router.get("/transcriptions", securityCheck, async function (req, res) {
  const response = await transcriptionService.getTranscriptions(
    req.body.audioUrl
  );
  await responseHandler.handleServiceResponse(req, res, response);
});

router.post("/azure-transcription", securityCheck, async function (req, res) {
  const response = await transcriptionService.transcribeAudioWithAzure(
    req.body.audioUrl
  );
  await responseHandler.handleServiceResponse(req, res, response);
});

module.exports = router;
