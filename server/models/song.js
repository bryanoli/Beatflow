module.exports = (sequelize, DataTypes) => {
    const Song = sequelize.define("Song", {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false
      },
      album: {
        type: DataTypes.STRING
      },
      releaseYear: {
        type: DataTypes.INTEGER
      },
      durationSeconds: {
        type: DataTypes.INTEGER
      },
      genre: {
        type: DataTypes.STRING
      }
    });
  
    return Song;
  };