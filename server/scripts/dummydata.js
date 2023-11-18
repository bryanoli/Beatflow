const { User, Song, Favorites } = require('../models');

const addDummyData = async () => {
  try {
    // Add your dummy data here
    const dummyUsers = [
      { username: 'user1', email: 'user1@example.com', password: 'password1' },
      { username: 'user2', email: 'user2@example.com', password: 'password2' },
    ];

    const dummySongs = [
      {
        title: 'Dummy Song 1',
        artist: 'Artist 1',
        album: 'Album 1',
        releaseYear: 2021,
        durationSeconds: 180,
        genre: 'Pop',
      },
      {
        title: 'Dummy Song 2',
        artist: 'Artist 2',
        album: 'Album 2',
        releaseYear: 2022,
        durationSeconds: 240,
        genre: 'Rock',
      },
    ];

    // Insert dummy data into the database
    const users = await User.bulkCreate(dummyUsers, { returning: true });
    const songs = await Song.bulkCreate(dummySongs, { returning: true });

    const dummyFavorites = [
      { UserId: users[0].id, SongId: songs[0].id },
      { UserId: users[0].id, SongId: songs[1].id },
      { UserId: users[1].id, SongId: songs[1].id },
    ];

    await Favorites.bulkCreate(dummyFavorites);

    console.log('Dummy data added successfully.');
  } catch (error) {
    console.error('Error adding dummy data:', error);
  } finally {
    // Close database connection if needed
    // sequelize.close();
  }
};

module.exports = addDummyData;
