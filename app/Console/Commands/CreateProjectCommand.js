import { Command } from './Command';
import { Downloader } from '../../Utils/Downloader';
import path from 'path';
import rimraf from 'rimraf';
import mv from 'mv';
import fs from 'fs';
import { Decompresser } from '../../Utils/Decompresser';
import { Console } from '@vicoders/console';
import _ from 'lodash';

export default class CreateProjectCommand extends Command {
  signature() {
    return 'create-project';
  }

  description() {
    return 'Software Development Kit for Vicoders';
  }

  options() {
    return [
      { key: 'name', description: 'The application name' },
      { key: 'choose', description: 'Choose kit that you want to create' }
    ];
  }

  async handle(options) {
    const data = [
      {
        url: 'https://github.com/shiranheika/kit-nodejs/archive/master.zip',
        name: 'nodejs',
        description: 'Create a Nodejs framework'
      }
    ];
    let kit;
    if (!_.has(options, 'choose')) {
      kit = await Console.select('kit', data);
    } else {
      kit = data[options.choose - 1];
    }

    let name = kit.name;
    if (typeof options.name === 'string' && options.name !== '') {
      name = options.name;
    }
    const filename = Date.now().toString();
    const dest = path.resolve(process.cwd(), filename + '.zip');
    await new Downloader().download(kit.url, dest);
    await new Decompresser().decompress(dest, path.resolve(process.cwd(), filename));
    rimraf.sync(dest);
    const folder = path.resolve(process.cwd(), filename);
    const files = fs.readdirSync(folder);
    mv(`${folder}/${files[0]}`, path.resolve(process.cwd(), name), () => {});
    rimraf.sync(folder);
  }
}
