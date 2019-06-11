import fs from 'fs';

export class Generator {
  cwd() {
    return process.cwd();
  }
  hasFile(path) {
    return fs.existsSync(path);
  }
}
