'use strict';

module.exports = (sequelize, DataTypes) => {
  var Configuration = sequelize.define(
    'configuration',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING
    },
    {
      underscored: true,
      tableName: 'configurations'
      // freezeTableName: true
    }
  );

  // Configuration.associate = models => {};

  return Configuration;
};
