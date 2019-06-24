import fse from 'fs-extra';
import path from 'path';
import moment from 'moment';
import _ from 'lodash';
export class NodeTemplate {
  getIndexTemplate(file) {
    const content = `
    import express from 'express';
    
    var router = express.Router();
    
    export default router;`;
    fse.outputFileSync(file, content);
  }

  getRouterTemplate(file, model) {
    const content = `
import express from 'express';
import { AuthMiddleware } from '../../../../src/Services/Auth/AuthMiddleware';
import ${model}Controller from '../../../../http/controller/${model}Controller';
var router = express.Router();

const controller = new ${model}Controller();
router.all('*', AuthMiddleware);
router.get('/', controller.getAll);

export default router;`;
    fse.outputFileSync(file, content);
  }

  getRepositoryTemplate(model) {
    const file = path.resolve(process.cwd(), 'src/Repositories', `${model}Repository.js`);
    const content = `
import ${model} from '../Models/${model}';
export default class ${model}Repository {
  async getAll() {
    return ${model}.findAll();
  }
}`;
    fse.outputFileSync(file, content);
  }

  getControllerTemplate(model) {
    const file = path.resolve(process.cwd(), 'http/controller', `${model}Controller.js`);
    const content = `
import ${model}Repository from '../../src/Repositories/${model}Repository';

export default class ${model}Controller {
  async getAll(req, res) {
    const result = await new ${model}Repository().getAll();
    res.json(result);
  }
}`;
    fse.outputFileSync(file, content);
  }

  getMigrationTemplate(migrations, model) {
    const file = path.resolve(process.cwd(), 'database/migrations', `${moment().format('YYYYMMDD_HHmmss')}_create_${model.toLowerCase()}_table.js`);
    const content = `
    'use strict';
    module.exports = {
      up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(function handleTransaction(t) {
          return Promise.all([
            queryInterface.createTable('${model.toLowerCase()}', {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              }
              deleted_at: {
                allowNull: true,
                type: Sequelize.DATE
              },
              created_at: {
                allowNull: false,
                type: Sequelize.DATE
              },
              updated_at: {
                allowNull: false,
                type: Sequelize.DATE
              }
            })
          ]);
        });
      },
    
      down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(function handleTransaction(t) {
          return Promise.all([queryInterface.dropTable('${model.toLowerCase()}')]);
        });
      }
    };`;
    fse.outputFileSync(file, content);
  }

  getModelTemplate(migrations, model) {
    _.remove(migrations, element => element.type === 'INCREMENT');
    const find = _.find(migrations, { type: 'REFERENCE' });
    if (find) {
      find['type'] = 'INTEGER';
    }
    const file = path.resolve(process.cwd(), 'src/Models', `${model}.js`);
    const content = `import Sequelize from 'sequelize';
import sequelize from '../../config/sequelize';

const ${model} = sequelize.define(
  '${model.toLowerCase()}',
  {
    <% _.forEach(migrations, function(element) { %>
    <%- element.field %>: {
      type: Sequelize.<%- element.type %>
    },<% }); %>
  },
  {
    tableName: '${model.toLowerCase()}',
    underscored: true,
    paranoid: false
  }
);

export default ${model};`;
    const compiled = _.template(content);
    fse.outputFileSync(file, compiled({ migrations: migrations }));
  }
}
