import { PhpPackageInstaller } from '../PhpPackageInstaller';
import { Console } from '@vicoders/console';

export class LaravelPkgInstaller extends PhpPackageInstaller {
  async publish(provider, options) {
    options = options || {};
    let command = `php artisan vendor:publish --provider="${provider}"`;
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const value = options[key];
        command += ` --${key}="${value}"`;
      }
    }
    await Console.exec(command);
  }
}
