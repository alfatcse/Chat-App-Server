const { addMessageService, getMessage } = require("../Service/message.service");
exports.addMessage = async (req, res, next) => {
  try {
    const message = await addMessageService(req.body);
    if (message === true) {
      res.status(200).json({
        status: "Success",
        message: "Data inserted",
      });
    } else if (message === false) {
      res.status(400).json({
        status: "Failed",
        message: "Failed to add Message to DataBase",
        data: error.message,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Users not found",
      data: error.message,
    });
    next(error);
  }
};
exports.getMessages = async (req, res, next) => {
  try {
    const mgsGet=await getMessage(req.body);
    res.status(200).json({
        status: "Success",
        data:mgsGet
    })
  } catch (error) {
    res.status(400).json({
        status: "Failed",
        message: "Users not found",
        data: error.message,
      });
      next(error);
  }
};
