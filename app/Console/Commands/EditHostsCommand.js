import { Command } from './Command';
import Os from '../../Utils/Os/Os';
import opn from 'opn';
import { Console } from '@vicoders/console';
import Win from '../../Utils/Os/Win';
import Linux from '../../Utils/Os/Linux';

export default class EditHostsCommand extends Command {
  signature() {
    return 'edithosts';
  }

  description() {
    return 'Change file hosts !';
  }

  options() {}

  async handle() {
    const checkEditer = async (os, path) => {
      if (os.CheckExists('code')) {
        await Console.childProcessExec(`code ${path}`);
      } else if (os.CheckExists('subl')) {
        await Console.childProcessExec(`code ${path}`);
      } else {
        await opn(path);
      }
    };
    const os = new Os();
    const platform = os.platform();
    let path = '/etc/hosts';
    if (platform === 'win32') {
      path = 'C:\\Windows\\System32\\drivers\\etc\\hosts';
      const win = new Win();
      checkEditer(win, path);
    } else {
      const linux = new Linux();
      checkEditer(linux, path);
    }
  }
}
