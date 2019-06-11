import Repository from './Repository';
import { Project } from '../../models';

export default class ProjectRepository extends Repository {
  Models() {
    return Project;
  }
}
