import { Project } from '../../models/Project';
export default class ProjectRepository {
  async findName(name) {
    return Project.findOne({
      where: {
        name: name
      }
    });
  }

  async create(project) {
    return Project.create(project);
  }

  async get() {
    return Project.findAll();
  }

  async findByNameOrId(condition) {
    return Project.findOne({
      $or: [{ name: condition }, { id: condition }]
    });
  }
}
