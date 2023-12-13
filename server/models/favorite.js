const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('UserSavedTrack', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    track_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    track_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album_name: {
      type: DataTypes.STRING,
    },
    market: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    added_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};