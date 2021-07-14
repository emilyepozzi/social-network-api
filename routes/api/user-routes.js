const routing = require('express').Router();


const {
    gettingUsersAll,
    getUserById,
    crteUser,
    updUser,
    delUser,
    addFriend,
    delFriend
} = require('../../controllers/user-controller');

routing
    .route('/')
    .get(gettingUsersAll)
    .post(crteUser);

routing.route('/:id')
    .get(getUserById)
    .put(updUser)
    .delete(delUser)

routing.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(delFriend)

module.exports = routing;