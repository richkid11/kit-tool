import { JsPackageInstaller } from './JsPackageInstaller';

export default class VicodersGeneratorInstaller extends JsPackageInstaller {
  constructor() {
    super();
    this.pkg = '@vicoders/generator';
  }

  async beforeInstall() {}

  async afterInstall() {}
}
