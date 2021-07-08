const { User, Thought } = require('../models')

const thatControl = {
    getThoughts(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtInformation => res.json(dbThoughtInformation))
            .catch(e => {
                console.log(e);
                res.status(500).json(e);
            })
    },
    // GET /api/thoughts/:id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtInformation => {
                if (!dbThoughtInformation) {
                    res.status(404).json({ message: 'No thought found at this id' });
                    return;
                }
                res.json(dbThoughtInformation);
            })
            .catch(e => {
                console.log(e);
                res.status(400).json(e);
            });
    },
    // POST /api/thoughts
    crteThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
                    .then(dbThoughtInformation => {
                        if (!dbThoughtInformation) {
                            res.status(404).json({ message: 'No though found at this id' });
                            return;
                        }
                        res.json(dbThoughtInformation);
                    })
                    .catch(e => res.json(e));
            })
            .catch(e => res.status(400).json(e));
    },
    // POST /api/thoughts/:id/reactions
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtInformation => {
                if (!dbThoughtInformation) {
                    res.status(404).json({ message: 'No reaction found at this id' });
                    return;
                }
                res.json(dbThoughtInformation);
            })
            .catch(e => res.status(500).json(e));
    },
    // PUT /api/thoughts/:id
    updThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
            .then(dbThoughtInformation => {
                if (!dbThoughtInformation) {
                    res.status(404).json({ message: 'No thought found at this id' });
                    return;
                }
                res.json(dbThoughtInformation);
            })
            .catch(e => res.status(400).json(e));
    },
    // Deleted thghts
    thtDel({ params }, res) {
        Thought.findDelete({ _id: params.id })
            .then(dbThoughtInformation => {
                if (!dbThoughtInformation) {
                    res.status(404).json({ message: 'There is no thoughts at this ID' });
                    return;
                }
                User.findOneAndUpdate(
                    { username: dbThoughtInformation.username },
                    { $pull: { thoughts: params.id } }
                )
                    .then(() => {
                        res.json({ message: 'Successfully deleted thought' });
                    })
                    .catch(e => res.status(500).json(e));
            })
            .catch(e => res.status(500).json(e));
    },

    // DELETE /api/thoughts/:id/reactions/:id
    reactDel({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtInformation => {
                if (!dbThoughtInformation) {
                    res.status(404).json({ message: 'No reaction found at this id' });
                    return;
                }
                res.json({ message: 'Successfully deleted reaction' });
            })
            .catch(e => res.status(500).json(e));
    },
}
module.exports = thatControl;