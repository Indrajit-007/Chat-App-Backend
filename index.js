
const { connectDB } = require('./Database/connection.js');
const { router } = require('./Routes.js');
const { io, app, ServerHere, express } = require('./Utilities/sockt.js')
const { Users } = require('./Database/users.model.js');
const cors = require('cors');
const { userHandler } = require('./controllers/AllUsers.js');
const { MessageHandler } = require('./controllers/AllChats.js');
const { Message } = require("./Database/message.models.js");
require('dotenv').config();


app.use(cors({
    origin: `${process.env.FORNT_END_URL}`
}))

connectDB(process.env.MONGO_DB_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', router);




io.use((socket, next) => {

    const Sessionid = socket.handshake.auth.Sessionid;
    socket.Sessionid = Sessionid;
    next();
})

io.on("connection", (socket) => {
    userHandler(socket);
    MessageHandler(socket);


    socket.on("PersonalMessage", async (msg) => {
        const SessionID = socket.Sessionid;
        if (msg.message !== "") {
            await Message.create({ message: msg.message, to: msg.to, from: SessionID });
            if (!(msg.to === SessionID)) {
                io.to(msg.to).emit("PersonalMessage", { message: msg.message, to: msg.to, from: SessionID });
            }
        }
    })

})


ServerHere.listen(process.env.PORT, () => {
    console.log(`server running on http://localhost:${process.env.PORT}`)
});
