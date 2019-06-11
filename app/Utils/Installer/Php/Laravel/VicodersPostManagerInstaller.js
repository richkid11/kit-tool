import { LaravelPkgInstaller } from './LaravelPkgInstaller';
import { App } from '@nsilly/container';
import { JsPackageInstaller } from '../../Javascript/JsPackageInstaller';
import { Console } from '@vicoders/console';
import { NonAngularGenerator } from '../../../../Entities/NonAngularGenerator';

export default class VicodersPostManagerInstaller extends LaravelPkgInstaller {
  constructor() {
    super();
    this.pkg = 'vicoders/postmanager';
  }

  async beforeInstall() {
    await this.setupRepository();
  }

  async afterInstall() {
    await this.installPackage('vicoders/postmanager', null, { skipOnInstalled: true });
    if (!(await App.make(JsPackageInstaller).isInstalled('@vicoders/generator'))) {
      await App.make(JsPackageInstaller).installPackage('@vicoders/generator', null, { skipOnInstalled: true });
    }
    await App.make(NonAngularGenerator).before();
    await Console.exec(`${process.cwd()}/node_modules/.bin/ng generate @vicoders/generator:installer --package=postmanager`);
    await App.make(NonAngularGenerator).after();

    await this.publish('VCComponent\\Laravel\\Post\\Providers\\PostComponentProvider');
    await this.publish('Dingo\\Api\\Provider\\LaravelServiceProvider');
    await this.publish('Tymon\\JWTAuth\\Providers\\LaravelServiceProvider');
    await this.publish('Prettus\\Repository\\Providers\\RepositoryServiceProvider');
  }
}
