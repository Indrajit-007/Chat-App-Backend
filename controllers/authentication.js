const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");
const { Users } = require('../Database/users.model.js');

const authentication = async (req, res, next) => {
    try {

        const Sessionid = req.query.Sessionid;

        if (Sessionid) {
            const user = await Users.findOne({ Sessionid });
            if (!user) {
                return res.status(400).json({ "msg": "Invalid session ID" })
            }
            res.status(200).json({ validation: true })
        }

        const username = req.query.username;

        if ((username == "")) {
            return res.status(400).json({ "msg": "Invalid username" })
        }

        const session = randomId();
        const user = await Users.findOne({ username });
        if (!user) {
            await Users.create({
                username, Sessionid: session
            })
            return res.status(200).json({ msg: "user created", Sessionid: session });
        }
        return res.status(400).json({ "msg": "user already exists" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { authentication };