import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import semver from 'semver';
import { Installer } from '../Installer';
import { Info } from '../../../Console/Commands/Command';
import { Console } from '@vicoders/console';

export const DEFAULT_MANAGER = 'yarn';
export const NPM_MANAGER = 'npm';

export class JsPackageInstaller extends Installer {
  constructor() {
    super();
    this.manager = DEFAULT_MANAGER;
  }

  isPackageManager(manager) {
    return this.manager === manager;
  }

  isValidVersion() {
    return semver.valid(this.version);
  }

  async setupRegistry() {}

  getPackagesFile() {
    return path.resolve(this.cwd(), 'package.json');
  }

  parsePackages() {
    const content = fs.readFileSync(this.getPackagesFile());
    return JSON.parse(content);
  }

  /**
   * Determine the given package is installed or not
   * @param String package
   *
   * @return Boolean
   */
  isInstalled(pkgname) {
    const pkgs = this.parsePackages();
    const isDependency = _.isObject(pkgs) && _.isObject(pkgs.dependencies) && !_.isNil(_.get(pkgs.dependencies, pkgname));

    if (isDependency) {
      return true;
    } else {
      const isDevDependency = _.isObject(pkgs) && _.isObject(pkgs.devDependencies) && !_.isNil(_.get(pkgs.devDependencies, pkgname));
      return isDevDependency;
    }
  }

  /**
   * Install required package
   * @param String package
   * @param String version
   *
   * @return void
   */
  async installPackage(pkg, version, options) {
    this.pkg = pkg;
    if (semver.valid(version)) {
      this.version = version;
    }
    await this.install(options);
  }

  async beforeIntall() {}

  async afterInstall() {}
  /**
   * Execute install package command
   *
   * @return void
   */
  async install(options = {}) {
    await this.beforeIntall();
    if (options.force !== true && this.isInstalled(this.pkg)) {
      if (options.skipOnInstalled === true) {
        Info(`${this.pkg} is installed`);
        return;
      } else {
        Error(`${this.pkg} is installed already`);
      }
    }
    if (this.isPackageManager(DEFAULT_MANAGER)) {
      let command;
      if (this.isValidVersion()) {
        command = `yarn add ${this.pkg}@${this.version}`;
      } else {
        command = `yarn add ${this.pkg}`;
      }
      await Console.exec(command);
    }
    await this.afterInstall();
  }
}
