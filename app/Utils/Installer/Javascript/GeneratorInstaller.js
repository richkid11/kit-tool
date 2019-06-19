import { JsPackageInstaller } from './JsPackageInstaller';

export default class GeneratorInstaller extends JsPackageInstaller {
  constructor() {
    super();
    this.pkg = 'kit-generate';
  }

  async beforeInstall() {}

  async afterInstall() {}
}
