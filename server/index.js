const express = require('express');
const app = express();

app.use(express.json());

const db = require('./models');

//Routers

const postRouter = require('./routes/posts');
app.use('/posts', postRouter);

db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
});

