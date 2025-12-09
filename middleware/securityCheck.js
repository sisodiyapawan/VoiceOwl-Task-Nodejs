require("dotenv").config();
const responseHandler = require("../middleware/responseHandler");

const securityCheck = async (req, res, next) => {
  const requiredHeaders = [
    { key: "api-key", message: "api access key is missing." },
  ];

  for (const header of requiredHeaders) {
    if (!req.headers[header.key] || req.headers[header.key] === "") {
      const response = {
        status: false,
        message: header.message,
      };
      await responseHandler.handleServiceResponse(req, res, response);
      return;
    }
  }

  const appApiAccessKey = process.env.APP_API_KEY;
  const requestApiAccessKey = req.headers["api-key"];
  if (appApiAccessKey != requestApiAccessKey) {
    const response = {
      status: false,
      message: "Invalid API access key.",
    };
    await responseHandler.handleServiceResponse(req, res, response);
    return;
  }
  next();
};

module.exports = securityCheck;
