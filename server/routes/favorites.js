const express = require('express');
const router = express.Router();
const { Favorites } = require('../models');

// GET all favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorites.findAll();
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST create a new favorite
router.post('/', async (req, res) => {
  try {
    const newFavorite = await Favorites.create(req.body);
    res.status(201).json(newFavorite);
  } catch (error) {
    console.error('Error creating favorite:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
