import { Command } from './Command';
import { Downloader } from '../../Utils/Downloader';
import { App } from '@nsilly/container';
import path from 'path';
import rimraf from 'rimraf';
import mv from 'mv';
import fs from 'fs';
import { Decompresser } from '../../Utils/Decompresser';
import { Console, File } from '@vicoders/console';
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
      { key: 'xampp?', description: 'Addition configuration for xampp' },
      { key: 'choose', description: 'Choose kit that you want to create' }
    ];
  }

  async handle(options) {
    const data = [
      {
        url: 'http://bitbucket.org/vicoderscom/vc_kit_angular_cli_v6/get/master.zip',
        name: 'angular-admin',
        description: 'Vicoder Angular Admin Panel KIT'
      },
      {
        url: 'https://bitbucket.org/vicoderscom/vc_kit_html_css_javascript/get/master.zip',
        name: 'kit-html-css',
        description: 'A kit for HTML/CSS/JS project'
      },
      {
        url: 'https://bitbucket.org/hieu_pv/vc_kit_javascript_module/get/master.zip',
        name: 'kit-javascript',
        description: 'A kit for javascript module development'
      },
      {
        url: 'https://github.com/codersvn/kit_nodejs/archive/master.zip',
        name: 'kit-nodejs',
        description: 'A kit for nodejs module development'
      },
      {
        url: 'https://github.com/codersvn/kit-tsx/archive/master.zip',
        name: 'kit-tsx',
        description: 'A kit for react library development'
      },
      {
        url: 'https://github.com/nsilly/nsilly/archive/master.zip',
        name: 'kit-nodejs-nsilly',
        description: 'Create a Nodejs with nsilly framework'
      },
      {
        url: 'https://github.com/codersvn/kit-wp-plugin/archive/master.zip',
        name: 'kit-wordpress-plugin',
        description: 'Create a wordpress plugin with nf-core package'
      },
      {
        url: 'https://github.com/hieu-pv/docker-dev/archive/master.zip',
        name: 'docker',
        description: 'Docker Config'
      },
      {
        url: 'https://github.com/nf-theme/theme/archive/master.zip',
        name: 'kit-wp-theme',
        description: 'Wordpress Theme uses NFTheme framework'
      },
      {
        url: 'https://bitbucket.org/vicoderscom/vc_kit_html_css_javascript/get/blade.zip',
        name: 'kit-html-css-blade',
        description: 'HTML/CSS KIT with blade engine supported'
      },
      {
        url: 'https://bitbucket.org/hieu_pv/vc_kit_angular_cli_v7/get/master.zip',
        name: 'vicoder-angular-kit',
        description: 'Vicoders Angular KIT'
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
    await App.make(Downloader).download(kit.url, dest);
    await App.make(Decompresser).decompress(dest, path.resolve(process.cwd(), filename));
    rimraf.sync(dest);
    const folder = path.resolve(process.cwd(), filename);
    const files = fs.readdirSync(folder);
    mv(`${folder}/${files[0]}`, path.resolve(process.cwd(), name), () => {});
    rimraf.sync(folder);
    if (kit.url === 'https://bitbucket.org/vicoderscom/vc_kit_html_css_javascript/get/blade.zip') {
      const new_project_dir = path.resolve(process.cwd(), name);
      process.chdir(new_project_dir);
      await Console.childProcessExec('cp .env.example .env');
      await Console.exec('composer install');
      await Console.exec('yarn install');
      if (options.xampp === true) {
        const add_virtual_host = await Console.confirm('Do you want to setup virtual domain configuration?');
        if (add_virtual_host) {
          const domain = await Console.ask('Domain: ', '', { required: true });
          if (domain !== undefined && domain !== '') {
            await File.appendTo(
              path.resolve(new_project_dir, '..', '..', 'apache', 'conf', 'extra', 'httpd-vhosts.conf'),
              `\n<VirtualHost *:80>\nDocumentRoot ${path.resolve(new_project_dir, 'public')}\nServerName ${domain}\n</VirtualHost>\n`
            );
          }
        }
      }
    }
  }
}
