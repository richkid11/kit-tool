import Os from '../Utils/Os/Os';

export class NonGeneratorModel {
  generateMigrationOption(migrations) {
    const os = new Os().platform();
    if (os === 'darwin') {
      return `--migrations='${migrations}'`;
    }
    return `--migrations=${migrations}`;
  }
}
