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

  async update(id, data) {
    return models.project.update(data, { where: { id: id } });
  }

  async findById(id) {
    return models.project.findOne({
      where: {
        id: id
      }
    });
  }
}
