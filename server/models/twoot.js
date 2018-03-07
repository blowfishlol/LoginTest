'use strict';
module.exports = (sequelize, DataTypes) => {
  var Twoot = sequelize.define('Twoot', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
  }});

  Twoot.associate = function(models) {
    Twoot.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
  };
  return Twoot;
};
