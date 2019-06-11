import { LaravelPkgInstaller } from './LaravelPkgInstaller';
import { App } from '@nsilly/container';
import { JsPackageInstaller } from '../../Javascript/JsPackageInstaller';
import { Console } from '@vicoders/console';
import { NonAngularGenerator } from '../../../../Entities/NonAngularGenerator';
import shell from 'shelljs';
import { PhpPackageInstaller } from '../PhpPackageInstaller';
import { Info } from '../../../../Console/Commands/Command';

export default class VicodersUserManagerInstaller extends LaravelPkgInstaller {
  constructor() {
    super();
    this.pkg = 'vicoders/usermanager';
  }

  async beforeInstall() {
    await this.setupRepository();
  }

  async afterInstall() {
    await App.make(JsPackageInstaller).installPackage('@vicoders/generator', null, { skipOnInstalled: true });
    await App.make(PhpPackageInstaller).installPackage('codersvn/roles', null, { skipOnInstalled: true });
    await shell.rm('-rf', 'config/auth.php');
    await App.make(NonAngularGenerator).before();
    await Console.exec(`${process.cwd()}/node_modules/.bin/ng generate @vicoders/generator:installer --package=usermanager`);
    await App.make(NonAngularGenerator).after();

    await this.publish('VCComponent\\Laravel\\User\\Providers\\UserComponentProvider');
    await this.publish('Dingo\\Api\\Provider\\LaravelServiceProvider');
    await this.publish('Tymon\\JWTAuth\\Providers\\LaravelServiceProvider');
    await this.publish('Prettus\\Repository\\Providers\\RepositoryServiceProvider');
    await this.publish('NF\\Roles\\RolesServiceProvider', { tag: 'config' });
    await this.publish('NF\\Roles\\RolesServiceProvider', { tag: 'migrations' });

    Info(`
    $api->get('permissions', 'App\\Http\\Controllers\\Api\\Admin\\PermissionController@index');
    $api->get('permissions/all', 'App\\Http\\Controllers\\Api\\Admin\\PermissionController@list');
    $api->get('permissions/{id}', 'App\\Http\\Controllers\\Api\\Admin\\PermissionController@show');

    $api->get('roles/all', 'App\\Http\\Controllers\\Api\\Admin\\RoleController@list');
    $api->put('roles/permission/attach/{id}', 'App\\Http\\Controllers\\Api\\Admin\\RoleController@attachPermission');
    $api->put('roles/permission/detach/{id}', 'App\\Http\\Controllers\\Api\\Admin\\RoleController@detachPermission');
    $api->put('roles/permission/sync/{id}', 'App\\Http\\Controllers\\Api\\Admin\\RoleController@syncPermission');
    `);
  }
}
