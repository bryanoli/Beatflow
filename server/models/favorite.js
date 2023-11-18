module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define("Favorites", {

    favoritedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  Favorites.associate = (models) => {
    Favorites.belongsTo(models.User);
    Favorites.belongsTo(models.Song);
  };

  return Favorites;
};