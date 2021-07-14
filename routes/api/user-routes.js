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

    routing.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(delFriend)

routing.route('/:id')
    .get(getUserById)
    .put(updUser)
    .delete(delUser)

module.exports = routing;