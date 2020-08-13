import { Command } from './Command';
import ConfigurationRepository from '../../Repositories/ConfigurationRepository';
import { Console } from '@vicoders/console';
import ProjectRepository from '../../Repositories/ProjectRepository';

export default class ShowConfigurationCommand extends Command {
  signature() {
    return 'showconfig';
  }

  description() {
    return 'Show all configuration';
  }

  async handle() {
    const type = await Console.select('type', [
      { name: 'config', description: 'Show All Config' },
      { name: 'project', description: 'Show All Project' }
    ]);
    switch (type.name) {
      case 'config':
        const repository = new ConfigurationRepository();
        const configs = await repository.get();
        let array = [];
        for (const item of configs) {
          const object = { key: item.key, value: item.value };
          array.push(object);
        }
        console.table(array);
        break;
      case 'project':
        const project = new ProjectRepository();
        const a = await project.get();
        let arr = [];
        for (const item of a) {
          const obj = { name: item.name, framework: item.framework, id: item.id };
          arr.push(obj);
        }
        console.table(arr);
        break;
      default:
        break;
    }
  }
}
