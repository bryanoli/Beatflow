module.exports = (sequelize, DataTypes) => {
  const SpotifyTrack = sequelize.define("SpotifyTrack", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
    },
    durationSeconds: {
      type: DataTypes.INTEGER,
    },
    genre: {
      type: DataTypes.STRING,
    },
    // New Spotify-specific fields
    spotifyTrackId: {
      type: DataTypes.STRING, // or INTEGER, depending on Spotify's track ID format
      allowNull: false,
      unique: true,
    },
    // Add other fields as needed
  });

  return SpotifyTrack;
};