import models from '../../models';
export default class ProjectRepository {
  async findName(name) {
    return models.project.findOne({
      where: {
        name: name
      }
    });
  }

  async create(project) {
    return models.project.create(project);
  }

  async get() {
    return models.project.findAll();
  }

  async findById(id) {
    return models.project.findOne({
      where: {
        id: id
      }
    });
  }
}
