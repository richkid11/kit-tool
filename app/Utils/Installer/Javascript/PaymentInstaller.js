import { JsPackageInstaller } from './JsPackageInstaller';

export default class PaymentInstaller extends JsPackageInstaller {
  constructor() {
    super();
    this.pkg = '@vicoders/payment';
  }

  async beforeInstall() {}

  async afterInstall() {}
}
