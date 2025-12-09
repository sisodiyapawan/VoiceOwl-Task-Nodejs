class responseHandler {
  async handleServiceResponse(req, res, serviceResponse) {
    switch (serviceResponse.status) {
      case true:
        res
          .status(200)
          .json({
            message: serviceResponse.message,
            data: serviceResponse.data,
          });
        break;

      case false:
        res
          .status(400)
          .json({
            message: serviceResponse.message,
            data: serviceResponse.data,
          });
        break;

      default:
        res.status(500).json({ message: "Internal Server Error" });
        break;
    }
  }
}

module.exports = new responseHandler();
