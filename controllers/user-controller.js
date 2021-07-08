const { User, Thought } = require('../models');

const userController = {
    // GET /api/users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserInfo => res.json(dbUserInfo))
            .catch(e => {
                console.log(e);
                res.status(500).json(e);
            })
    },
    // GET /api/users/:id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thought',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .then(dbUserInfo => {
                if (!dbUserInfo) {
                    res.status(404).json({ message: 'No user found at this id' });
                    return;
                }
                res.json(dbUserInfo);
            })
            .catch(e => {
                console.log(e);
                res.status(400).json(e);
            });
    },
    crteUser({ body }, res) {
        User.create(body)
            .then(dbUserInfo => res.json(dbUserInfo))
            .catch(e => res.status(400).json(e));
    },
    updUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserInfo => {
                if (!dbUserInfo) {
                    res.status(404).json({ message: 'No user found at this id' });
                    return;
                }
                res.json(dbUserInfo);
            })
            .catch(e => res.status(400).json(e));
    },
    // POST /api/users/:userId/friends/:friendId
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserInfo => {
                if (!dbUserInfo) {
                    res.status(404).json({ message: 'No user found at this userId' });
                    return;
                }
                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $addToSet: { friends: params.userId } },
                    { new: true, runValidators: true }
                )
                    .then(dbUserInfoBeta => {
                        if (!dbUserInfoBeta) {
                            res.status(404).json({ message: 'No user found at this friendId' })
                            return;
                        }
                        res.json(dbUserInfo);
                    })
                    .catch(e => res.json(e));
            })
            .catch(e => res.json(e));
    },
    // DELETE /api/users/:id
    delUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserInfo => {
                if (!dbUserInfo) {
                    res.status(404).json({ message: 'No user found at this id' });
                    return;
                }
                User.updateMany(
                    { _id: { $in: dbUserInfo.friends } },
                    { $pull: { friends: params.id } }
                )
                    .then(() => {
                        Thought.deleteMany({ username: dbUserInfo.username })
                            .then(() => {
                                res.json({ message: "Successfully deleted user and assiciated thoughts" });
                            })
                            .catch(e => res.status(400).json(e));
                    })
                    .catch(e => res.status(400).json(e));
            })
            .catch(e => res.status(400).json(e));
    },
    // DELETE /api/users/:userId/friends/:friendId
    delFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserInfo => {
                if (!dbUserInfo) {
                    res.status(404).json({ message: 'No user found at this userId' });
                    return;
                }
                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $pull: { friends: params.userId } },
                    { new: true, runValidators: true }
                )
                    .then(dbUserInfoBeta => {
                        if (!dbUserInfoBeta) {
                            res.status(404).json({ message: 'No user found at this friendId' })
                            return;
                        }
                        res.json({ message: 'Successfully deleted the friend' });
                    })
                    .catch(e => res.json(e));
            })
            .catch(e => res.json(e));
    }
}

module.exports = userController;
