import fs from 'fs';
import os from 'os';
import * as _ from 'lodash';
import { exec } from 'child-process-promise';

export default class Os {
  osName() {
    let osName;
    if (fs.existsSync('/etc/redhat-release')) {
      osName = 'redhat';
    }
    if (fs.existsSync('/etc/lsb-release')) {
      osName = 'debian';
    }
    return osName;
  }
  userInfo() {
    return os.userInfo();
  }
  platform() {
    return os.platform();
  }

  tmpDir() {
    return os.tmpdir();
  }

  async CheckExists(name) {
    return new Promise(async resolve => {
      try {
        await exec(`which ${name}`);
        resolve(true);
      } catch (e) {
        resolve(false);
      }
    });
  }
}
