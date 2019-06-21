'use strict';

module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define(
    'project',
    {
      name: DataTypes.STRING,
      dir_home: DataTypes.STRING,
      git_remote: DataTypes.STRING,
      framework: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      port: {
        type: DataTypes.INTEGER,
        defaultValue: 80
      }
    },
    {
      underscored: true
    }
  );

  return Project;
};
