const { Socket } = require("socket.io");
const { Message } = require("../Database/message.models.js");
const { Users } = require("../Database/users.model.js");
const { io } = require('../Utilities/sockt.js')

const MessageMap = new Map();


const MessageHandler = async (socket) => {
    const SessionID = socket.Sessionid;

    const messages = await Message.find({ $or: [{ to: SessionID }, { from: SessionID }] });


    messages.map(
        (obj) => {
            const otherUser = (obj.to === SessionID) ? obj.from : obj.to;
            if (!MessageMap.has(otherUser)) {
                MessageMap.set(otherUser, [obj]);
            }
            else {
                MessageMap.get(otherUser).push(obj)
            }
        }
    )

    const users = await Users.find({});

    const UsersWithMessages = users.map(obj => {
        if (MessageMap.has(obj.Sessionid)) {
            return { SessionID: obj.Sessionid, username: obj.username, messages: MessageMap.get(obj.Sessionid) };
        }
        else {
            return { SessionID: obj.Sessionid, username: obj.username, messages: [] };
        }
    });



    socket.emit("messages", UsersWithMessages);

    MessageMap.clear();

}

module.exports = { MessageHandler };