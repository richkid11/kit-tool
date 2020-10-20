import { Command, Table } from '../Command';
import { Console } from '@vicoders/console';
import { DatabaseService } from './DatabaseService';

export default class DatabaseShowTable extends Command {
  signature() {
    return 'showtable <table>';
  }

  description() {
    return 'Show all table !';
  }

  options() {
    return [
      { key: 'host', description: 'Database host' },
      { key: 'user', description: 'Database username' },
      { key: 'password', description: 'Database user password' },
      { key: 'port', description: 'Database port' }
    ];
  }

  async handle(table, options) {
    const dbService = new DatabaseService();
    const { executeable, host, port, user, password } = await dbService.checkCommand(options);
    const command = dbService.buildCommand(executeable, host, port, user, password);

    const listTable = (await Console.childProcessExec(`${command} -e "show tables from ${table}"`)).split('\n');
    listTable.shift();
    let arr = [];
    listTable.forEach((item) => {
      if (item !== '') {
        const obj = { TableName: item };
        arr.push(obj);
      }
    });
    Table(arr);
  }
}
