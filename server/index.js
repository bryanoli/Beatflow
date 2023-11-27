const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');
const addDummyData = require('./scripts/dummydata');

// Routers
const userRouter = require('./routes/users');
const songRouter = require('./routes/songs');
const favoritesRouter = require('./routes/favorites');
const authRouter = require('./routes/auth');
app.use('/users', userRouter);
app.use('/songs', songRouter);
app.use('/favorites', favoritesRouter);
app.use('/auth', authRouter);

db.sequelize.sync().then(() => {
  addDummyData();
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
});

