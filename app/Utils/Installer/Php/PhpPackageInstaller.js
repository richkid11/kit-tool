import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import semver from 'semver';
import { Installer } from '../Installer';
import { Console } from '@vicoders/console';
import { Info } from '../../../Console/Commands/Command';

export const DEFAULT_MANAGER = 'composer';

export class PhpPackageInstaller extends Installer {
  constructor() {
    super();
    this.manager = DEFAULT_MANAGER;
  }

  cwd() {
    return process.cwd();
  }

  isPackageManager(manager) {
    return this.manager === manager;
  }

  isValidVersion() {
    return semver.valid(this.version);
  }

  async setupRepository() {
    await Console.exec('vcsupport setup-vicoders-repository');
  }

  getComposerLocation() {
    return path.resolve(this.cwd(), 'composer.json');
  }

  getComposerLockLocation() {
    return path.resolve(this.cwd(), 'composer.lock');
  }

  parseComposer() {
    const content = fs.readFileSync(this.getComposerLocation());
    return JSON.parse(content);
  }

  parseComposerLock() {
    const content = fs.readFileSync(this.getComposerLockLocation());
    return JSON.parse(content);
  }

  /**
   * Determine the given package is installed or not
   * @param String package
   */
  isInstalled(pkgname) {
    let existingInLockedFile;
    if (this.hasFile(this.getComposerLockLocation())) {
      const composerLock = this.parseComposerLock();
      existingInLockedFile = _.isObject(composerLock) && _.isArray(composerLock.packages) && !_.isUndefined(_.find(composerLock.packages, item => item.name === pkgname));
    }
    if (existingInLockedFile) {
      return true;
    } else {
      const composer = this.parseComposer();
      return _.isObject(composer) && _.isObject(composer.require) && !_.isNil(_.get(composer.require, pkgname));
    }
  }

  /**
   * Install required package
   * @param String package
   * @param String version
   */
  async installPackage(pkg, version, options) {
    this.pkg = pkg;
    if (semver.valid(version)) {
      this.version = version;
    }
    await this.install(options);
  }

  async beforeInstall() {}

  async afterInstall() {}

  async install(options = {}) {
    await this.beforeInstall();
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
        command = `composer require ${this.pkg}:${this.version}`;
      } else {
        command = `composer require ${this.pkg}`;
      }
      await Console.exec(command);
    }
    await this.afterInstall();
  }
}
