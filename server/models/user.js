module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      spotifyID: {
        type: DataTypes.STRING,
        allowNull: true
      },
      spotifyAccessToken: {
        type: DataTypes.STRING, 
        allowNull: true
      },
      spotifyRefreshToken: {
        type: DataTypes.STRING,
        allowNull: true
      },

    });
  
    return User;
  };