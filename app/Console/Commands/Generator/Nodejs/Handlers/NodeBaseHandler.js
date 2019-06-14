import GeneratorInstaller from '../../../../../Utils/Installer/Javascript/GeneratorInstaller';
export class NodeBaseHandler {
  async setup() {
    await new GeneratorInstaller().install({ skipOnInstalled: true });
  }
}
