const express = require('express');
const { Mongoose } = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

Mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-media-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));