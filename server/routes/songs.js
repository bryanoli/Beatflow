const express = require('express');
const router = express.Router();
const { Song } = require('../models');
const axios = require('axios');

// GET all songs
router.get('/:id', async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST create a new song
router.post('/', async (req, res) => {
  try {
    const newSong = await Song.create(req.body);
    res.status(201).json(newSong);
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
