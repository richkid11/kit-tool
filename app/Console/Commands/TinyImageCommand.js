import { Command } from './Command';
import _ from 'lodash';
import { Console } from '@vicoders/console';
import ConfigurationRepository from '../../Repositories/ConfigurationRepository';
const TINY_PNG_API_KEY = 'I9uWHdRpRyKFkCQ6Oi8nROt6iQw4WKHG';

export default class TinyImageCommand extends Command {
  signature() {
    return 'tiny <file>';
  }

  description() {
    return 'Shrink all PNG images within the current directory or given file';
  }

  options() {
    return [{ key: 'key?', description: 'Your custom TinyPNG API Key' }];
  }

  async handle(file, options) {
    options = options || {};
    const api_key_db = await new ConfigurationRepository().getValue('tinyimageapikey');
    let api_key;
    if (_.isNil(api_key_db) || _.isNil(api_key_db.value)) {
      api_key = TINY_PNG_API_KEY;
    } else {
      api_key = api_key_db.value;
    }
    const key = api_key || options.key;
    let command;
    if (_.isNil(file)) {
      command = `npx tinypng-cli -r -k ${key}`;
    } else {
      command = `npx tinypng-cli ${file} -r -k ${key}`;
    }
    await Console.exec(command);
  }
}
