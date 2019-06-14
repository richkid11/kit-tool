import { Command } from '../../Command';
import { Console } from '@vicoders/console';
import { NodejsBasicRestApiHandler } from './Handlers/NodejsBasicRestApiHandler';
export default class RestApiGeneratorCommand extends Command {
  signature() {
    return 'nodejs';
  }

  description() {
    return 'Nodejs REST API Generator';
  }

  options() {
    return [{ key: 'override?', description: 'Override existing file.' }];
  }

  async handle(options) {
    const type = await Console.select('type', [
      { name: 'basic', description: 'Basic REST API NodeJS' }
    ]);

    switch (type.name) {
      case 'basic':
        new NodejsBasicRestApiHandler().handle(options);
        break;
      default:
        break;
    }
  }
}
