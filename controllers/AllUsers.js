const { Socket } = require("socket.io");
const { Users } = require("../Database/users.model");
const { io } = require('../Utilities/sockt.js');
const { UserMap } = require('../Utilities/UserMap.js');





const userHandler = async (socket) => {
    const SessionID = socket.Sessionid;

    const user = await Users.findOne({ Sessionid: SessionID });
    if (user) {
        //    ASSIGNING NECESSARY VALUES TO THE SOCKET 
        socket.Sessionid = user.Sessionid;
        socket.username = user.username;
        socket.status = true;

        //    JOINING SOCKET TO A ROOM WITH A OF ITS OWN SESSION ID
        socket.join(socket.Sessionid);

        //    ADDING OR UPDATING SOCKET TO USER MAP
        UserMap.set(socket.Sessionid, { username: socket.username, status: true })



        // SEND DATA OF ALL USERS TO ALL USERS
        io.emit("AllUsers", Array.from(UserMap));

        //     HANDLING DISCONNECTION
        socket.on("disconnect", async () => {
            const matchingSockets = await io.in(socket.Sessionid).allSockets();
            const isDisconnected = matchingSockets.size === 0;
            if (isDisconnected) {
                UserStatus = UserMap.get(socket.Sessionid).status;
                UserMap.set(socket.Sessionid, { username: socket.username, status: false })
                io.emit("AllUsers", Array.from(UserMap));
            }
        })
    }
    else {
        socket.emit("con-err", { "msg": "Invalid Session ID" });
    }
}

module.exports = { userHandler };