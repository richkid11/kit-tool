import { Console } from '@vicoders/console';
import _ from 'lodash';
import { RestApiGenerator, primaryField, migrationOptions, addField } from '../../../../../Entities/RestApiGenerator';
import path from 'path';
import fs from 'fs';
import { IndexTemplate } from '../../../../../Utils/IndexTemplate';
import { NodeBaseHandler } from './NodeBaseHandler';

export class NodejsBasicRestApiHandler extends NodeBaseHandler {
  async handle(options) {
    const generator = new RestApiGenerator();
    generator.setOption('type', 'rest_api');
    generator.setOption('name', await Console.ask('Model Name: ', null, { required: true }));
    let pathRouter = await Console.ask('Where is your router: ', 'router/api/v1/');
    if (pathRouter.substr(pathRouter.length - 1) !== '/') {
      pathRouter += '/';
    }
    const pathIndex = path.resolve(process.cwd(), pathRouter, 'index.js');
    if (!fs.existsSync(pathIndex)) {
      await new IndexTemplate().getIndexTemplate(pathIndex);
    }
    generator.setOption('router', pathRouter);
    generator.setOption('with', await Console.ask('Which part do you want to generate: ', 'router,model,repository,migration'));

    const is_custom_migration = await Console.confirm('Do you want to custom migration?');
    if (!is_custom_migration) {
      generator.useDefaultMigration();
    } else {
      generator.addMigration(primaryField(await Console.ask('Primary Key', 'id')));
      options = migrationOptions.map(item => {
        return item;
      });
      while (true) {
        const field = await Console.ask('Add field', null, { description: 'Leave it empty to break' });
        if (_.isNil(field) || field === '') {
          break;
        } else {
          const type = await Console.select('type', options);
          if (type.type === 'REFERENCE') {
            const reference_table = await Console.ask('Table reference: ');
            const reference_column = await Console.ask('Column reference: ', 'id');
            generator.addMigration(addField(field, type.type, { reference_table, reference_column }));
          } else {
            generator.addMigration(addField(field, type.type));
          }
        }
      }
    }
    await this.setup();
    await generator.exec();
  }
}
