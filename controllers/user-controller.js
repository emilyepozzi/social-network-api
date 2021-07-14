const { User, Thought } = require('../models');

const useContr = {
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserInformation => res.json(dbUserInformation))
            .catch(e => {
                console.log(e);
                res.status(500).json(e);
            })
    },
   
    

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
            .then(dbUserInformation => {
                if (!dbUserInformation) {
                    res.status(404).json({ message: 'No user found at this id' });
                    return;
                }
                res.json(dbUserInformation);
            })
            .catch(e => {
                console.log(e);
                res.status(400).json(e);
            });
    },
    crteUser({ body }, res) {
        User.create(body)
            .then(dbUserInformation => res.json(dbUserInformation))
            .catch(e => res.status(400).json(e));
    },
    updUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserInformation => {
                if (!dbUserInformation) {
                    res.status(404).json({ message: 'No user found at this id' });
                    return;
                }
                res.json(dbUserInformation);
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
            .then(dbUserInformation => {
                if (!dbUserInformation) {
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
                        res.json(dbUserInformation);
                    })
                    .catch(e => res.json(e));
            })
            .catch(e => res.json(e));
    },
    // DELETE /api/users/:id
    delUser({ params }, res) {
        User.findDelete({ _id: params.id })
            .then(dbUserInformation => {
                if (!dbUserInformation) {
                    res.status(404).json({ message: 'No user found at this id' });
                    return;
                }
                User.alotUpdate(
                    { _id: { $in: dbUserInformation.friends } },
                    { $pull: { friends: params.id } }
                )
                    .then(() => {
                        Thought.deleteMany({ username: dbUserInformation.username })
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
            .then(dbUserInformation => {
                if (!dbUserInformation) {
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

module.exports = useContr;
