'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    fullname: DataTypes.STRING,
    birthdate: DataTypes.DATE
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Twoot, {
      foreignKey: 'userId',
      as: 'twoots',
    })
  };
  return User;
};
