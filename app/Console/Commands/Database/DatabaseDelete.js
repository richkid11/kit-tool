import { Command } from '../Command';
import { DatabaseService } from './DatabaseService';
import { Console } from '@vicoders/console';

export default class DatabaseDelete extends Command {
  signature() {
    return 'dropdb <dbname>';
  }

  description() {
    return 'Delete Database Existing !';
  }

  options() {
    return [
      { key: 'user', description: 'Database username' },
      { key: 'password', description: 'Database user password' }
    ];
  }

  async handle(dbname, options) {
    const dbService = new DatabaseService();
    const confirm = await Console.confirm(`Do you want to delete database ${dbname} ?`);
    if (confirm) {
      const { executeable, host, port, user, password } = await dbService.checkCommand(options);
      const command = dbService.buildCommand(executeable, host, port, user, password);
      await Console.childProcessExec(`${command} -e 'drop database if exists ${dbname}'`).then(() => {
        console.log(`Deleted success database ${dbname}!`);
      });
    }
  }
}
