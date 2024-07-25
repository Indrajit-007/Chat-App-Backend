const { Users } = require('../Database/users.model.js');


const UserMap = new Map();
async function setUserMap(UserMap) {
    const AllUsers = await Users.find({});
    AllUsers.map(
        (obj) => {
            UserMap.set(obj.Sessionid, { username: obj.username, status: false })
        }
    )
}

setUserMap(UserMap);

module.exports = { UserMap };