import _ from 'lodash';
import { Command, Error } from '../Command';
import { exec } from 'child_process';
import { DatabaseService } from './DatabaseService';
import { Console } from '@vicoders/console';

export default class DatabaseExport extends Command {
  signature() {
    return 'exportdb <dbname> <file>';
  }

  description() {
    return 'Export database file.sql';
  }

  options() {
    return [
      { key: 'user', description: 'Database username' },
      { key: 'password', description: 'Database user password' }
    ];
  }

  async handle(dbname, file, options) {
    if (_.isNil(dbname) || dbname === '') {
      Error('dbname is required\ndbimport <dbname> <file>');
    }
    const dbService = new DatabaseService();
    const { executeable, host, port, user, password } = await dbService.checkCommand(options);
    const command = dbService.buildCommand(executeable, host, port, user, password);
    const databases = (await Console.childProcessExec(`${command} -e "show databases"`)).split('\n');
    const is_existing = databases.indexOf(dbname) > -1;
    if (is_existing === false) {
      Error('Database not exist !');
    }
    await exec(`${command.replace('mysql', 'mysqldump')} ${dbname} > ${file}.sql`);
    console.log('Export success !');
  }
}
