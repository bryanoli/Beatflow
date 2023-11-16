const express = require('express');
const router = express.Router();
const { posts } = require('../models');

router.get('/', async (req, res) => {
    try {
        const listOfPosts = await posts.findAll();

        if (listOfPosts.length === 0) {
            return res.status(404).json({ message: 'No posts found.' });
        }

        res.json(listOfPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {

    try {
        const post = req.body;
        await posts.create(post);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;