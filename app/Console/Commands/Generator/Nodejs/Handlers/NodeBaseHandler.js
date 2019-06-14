import VicodersGeneratorInstaller from '../../../../../Utils/Installer/Javascript/VicodersGeneratorInstaller';
export class NodeBaseHandler {
  async setup() {
    await new VicodersGeneratorInstaller().install({ skipOnInstalled: true });
  }
}
