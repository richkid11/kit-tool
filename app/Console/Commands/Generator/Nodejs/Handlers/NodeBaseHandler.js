import VicodersGeneratorInstaller from '../../../../../Utils/Installer/Javascript/VicodersGeneratorInstaller';
import { App } from '@nsilly/container';
export class NodeBaseHandler {
  async setup() {
    await App.make(VicodersGeneratorInstaller).install({ skipOnInstalled: true });
  }
}
