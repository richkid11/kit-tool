import _ from 'lodash';
import { Command } from '../Command';
import { App } from '@nsilly/container';
import { Console } from '@vicoders/console';
import Os from '../../../Utils/Os/Os';
import path from 'path';
import ConfigurationRepository from '../../../Repositories/ConfigurationRepository';

export default class DatabaseConfig extends Command {
  signature() {
    return 'configdb';
  }

  description() {
    return 'MySQL configuration';
  }

  options() {
    return [];
  }

  async handle() {
    const updateOrCreate = async data => {
      for (const i of data) {
        const { key, value } = i;
        await App.make(ConfigurationRepository).updateOrCreate({ key }, { key, value });
      }
    };
    const os = new Os().platform();
    const dbhost = await Console.ask('Database Host : ', 'localhost');
    const dbuser = await Console.ask('Database User User : ', 'root');
    const dbpass = await Console.ask('Database Password : ');
    const data = [{ key: 'dbhost', value: dbhost }, { key: 'dbuser', value: dbuser }, { key: 'dbpass', value: dbpass }];

    if (os === 'win32') {
      let mysql_executeable = await Console.ask('Path to your mysql.exe : ', path.resolve(process.cwd(), 'mysql.exe'), { description: 'Leave it empty to use current folder' });
      if (_.isNil(mysql_executeable) || mysql_executeable === '') {
        mysql_executeable = path.resolve(process.cwd(), 'mysql.exe');
      }
      updateOrCreate([...data, ...[{ key: 'mysql_executeable', value: mysql_executeable }]]);
    } else {
      updateOrCreate(data);
    }
  }
}
