import { LaravelPkgInstaller } from './LaravelPkgInstaller';

export default class VicodersCoreInstaller extends LaravelPkgInstaller {
  constructor() {
    super();
    this.pkg = 'vicoders/core';
  }

  async beforeInstall() {
    await this.setupRepository();
  }

  async afterInstall() {
    await this.declareEnvironmentVariable('API_PREFIX', 'api');
    await this.declareEnvironmentVariable('API_VERSION', 'v1');
    await this.declareEnvironmentVariable('API_NAME', 'Your API Name');
    await this.declareEnvironmentVariable('API_DEBUG', 'false');
    await this.publish('Dingo\\Api\\Provider\\LaravelServiceProvider');
    await this.publish('Tymon\\JWTAuth\\Providers\\LaravelServiceProvider');
    await this.publish('Prettus\\Repository\\Providers\\RepositoryServiceProvider');
  }
}
