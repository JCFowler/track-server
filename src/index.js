require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');
const { MONGO_URI } = require('../KEYS');

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongo conntected');
});

mongoose.connection.on('error', (e) => {
    console.log('Mongo Error');
    console.error(e)
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on 3000');
})