import { BaseService } from '../BaseService';
export class JavascriptService extends BaseService {
  resolveRelativePath(absolute_path, current_file_path) {
    let diff_absolute_path;

    const splited_absolute_path = absolute_path.split('/');
    const splited_current_file_path = current_file_path.split('/');
    const avg_length = (splited_absolute_path.length + splited_current_file_path.length) / 2;

    let diff_index = 0;
    for (let i = 0; i <= avg_length; i++) {
      if (splited_absolute_path[i] !== splited_current_file_path[i]) {
        break;
      }
      diff_index += splited_absolute_path[i].length + 1;
    }

    diff_absolute_path = absolute_path.slice(diff_index);
    const diff_current_file_path = current_file_path.slice(diff_index);
    const depth_depth_diff_absolute_path = diff_current_file_path.split('/').length;
    let ard = [];
    for (let i = 1; i < depth_depth_diff_absolute_path; i++) {
      ard.push(i);
    }
    return ard.map(() => '..').join('/') + '/' + diff_absolute_path;
  }
}
