import ConfigurationRepository from '../Repositories/ConfigurationRepository';
import { Console } from '@vicoders/console';
import { App } from '@nsilly/container';
import Os from './Os/Os';
import _ from 'lodash';
import path from 'path';
export class Configuration {
  async configDocker(option) {
    let dockerFolder;
    if (!_.has(option, 'docker')) {
      dockerFolder = await Console.ask('Docker Folder : ', process.cwd());
    } else {
      dockerFolder = option.dockerFolder;
    }
    await App.make(ConfigurationRepository).setValue('dockerFolder', dockerFolder);
  }

  async configDB(option) {
    let dbUser, dbPass, dbHost, dbPort, executeable;
    const updateOrCreate = async data => {
      for (const item of data) {
        await App.make(ConfigurationRepository).setValue(item.key, item.value);
      }
    };
    if (!_.has(option, 'user')) {
      dbUser = await Console.ask('Database User : ', 'root');
    } else {
      dbUser = option.user;
    }

    if (!_.has(option, 'password')) {
      dbPass = await Console.ask('Database Password : ');
    } else {
      dbPass = option.password;
    }

    if (!_.has(option, 'host')) {
      dbHost = await Console.ask('Database Host : ', 'localhost');
    } else {
      dbHost = option.host;
    }

    if (!_.has(option, 'port')) {
      dbPort = await Console.ask('Database Port : ', '3306');
    } else {
      dbPort = option.port;
    }

    const os = new Os().platform();
    const data = [{ key: 'dbuser', value: dbUser }, { key: 'dbpass', value: dbPass }, { key: 'dbhost', value: dbHost }, { key: 'dbport', value: dbPort }];
    if (os === 'win32') {
      executeable = await Console.ask('Path to your mysql.exe : ', path.resolve(process.cwd(), 'mysql.exe'));
      updateOrCreate([...data, ...[{ key: 'mysql_executeable', value: executeable }]]);
    } else {
      const use_custom_mysql_executeable = await Console.confirm('Do you want to use another MySQL executeable');
      if (use_custom_mysql_executeable) {
        executeable = await Console.ask('Your MySQL executeable : ', 'mysql');
        updateOrCreate([...data, ...[{ key: 'mysql_executeable', value: executeable }]]);
      } else {
        await updateOrCreate(data);
      }
    }
  }

  async configTinyImage() {
    const api_key = await Console.ask('TinyImage API Key : ');
    await App.make(ConfigurationRepository).setValue('tinyimageapikey', api_key);
  }
}
