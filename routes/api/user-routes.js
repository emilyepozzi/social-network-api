const routed = require('express').Router();
const {
    getAllUsers,
    getUserById,
    crteUser,
    updUser,
    delUser,
    addFriend,
    delFriend
} = require('../../controllers/user-controller');

routed
    .route('/')
    .get(getAllUsers)
    .post(crteUser);

routed.route('/:id')
    .get(getUserById)
    .put(updUser)
    .delete(delUser)

routed.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(delFriend)

module.exports = routed;