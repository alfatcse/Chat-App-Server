const Message = require("../Model/messageModel");
exports.addMessageService = async (data) => {
  const MsgData = {
    message: { text: data.message },
    users: [data.from, data.to],
    sender: data.from,
    createdAt: new Date(),
  };
  console.log("Msg Data", MsgData);
  const megInsert = await Message.create(MsgData);
  console.log("meg Insert", megInsert);
  if (megInsert) {
    return true;
  } else {
    return false;
  }
};
exports.getMessage = async (data) => {
  const { from, to } = data;
  const messages = await Message.find({
    users: {
      $all: [from, to],
    },
  }).sort({ createdAt: 1 });
  const projectedMessage = [];
  messages.map((msg) => {
    const m = {
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    };
    projectedMessage.push(m);
  });
  return projectedMessage;
};
