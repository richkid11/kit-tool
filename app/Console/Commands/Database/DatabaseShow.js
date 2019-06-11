import { Command } from '../Command';
import { Console } from '@vicoders/console';
import { DatabaseService } from './DatabaseService';

export default class DatabaseShow extends Command {
  signature() {
    return 'showdb';
  }

  description() {
    return 'Show all database !';
  }

  options() {
    return [{ key: 'host', description: 'Database host' }, { key: 'user', description: 'Database username' }, { key: 'password', description: 'Database user password' }];
  }

  async handle(options) {
    const dbService = new DatabaseService();
    const { executeable, host, port, user, password } = await dbService.checkCommand(options);
    const command = dbService.buildCommand(executeable, host, port, user, password);

    const listDB = (await Console.childProcessExec(`${command} -e "show databases"`)).split('\n');
    listDB.shift();
    listDB.forEach(item => {
      console.log(item.replace(/[^a-zA-Z0-9-_]/, ''));
    });
  }
}
