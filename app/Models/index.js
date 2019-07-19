import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/config.json';
import { getDatabasePath } from '../../database/database.const.js';

const basename = path.basename(module.filename);

const db = {};
// const command = process.argv[2];

// if (config.use_db_commands.indexOf(command) > -1) {
if (!config.sql_lite_path) {
  config.sql_lite_path = getDatabasePath();
}

const sequelize = new Sequelize('vcc', null, null, {
  dialect: 'sqlite',
  storage: config.sql_lite_path,
  logging: false,
  operatorsAliases: false
});

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// }

module.exports = db;
