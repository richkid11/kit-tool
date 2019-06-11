import { LaravelPkgInstaller } from './LaravelPkgInstaller';

export default class DingoApiInstaller extends LaravelPkgInstaller {
  constructor() {
    super();
    this.pkg = 'dingo/api';
    this.version = '2.0.0-alpha1';
  }

  async afterInstall() {
    await this.publish('Dingo\\Api\\Provider\\LaravelServiceProvider');
  }
}
