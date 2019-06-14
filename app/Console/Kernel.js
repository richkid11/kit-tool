import ProjectCommand from './Commands/ProjectCommand';
import OpenCommand from './Commands/OpenCommand';
import CreateProjectCommand from './Commands/CreateProjectCommand';
import InstallServiceCommand from './Commands/InstallServiceCommand';
import GitCommand from './Commands/GitCommand';
import PwdCommand from './Commands/PwdCommand';
import ChdirCommand from './Commands/ChdirCommand';
import EditHostsCommand from './Commands/EditHostsCommand';
import DatabaseExport from './Commands/Database/DatabaseExport';
import DatabaseCreate from './Commands/Database/DatabaseCreate';
import DatabaseImport from './Commands/Database/DatabaseImport';
import DatabaseDelete from './Commands/Database/DatabaseDelete';
import DatabaseShow from './Commands/Database/DatabaseShow';
import ShowConfigurationCommand from './Commands/ShowConfigurationCommand';
import ConfigCommand from './Commands/ConfigCommand';
import TinyImageCommand from './Commands/TinyImageCommand';
import RestApiGeneratorCommand from './Commands/Generator/Nodejs/RestApiGeneratorCommand';

export class Kernel {
  commands() {
    return [ChdirCommand, InstallServiceCommand, ProjectCommand, OpenCommand, CreateProjectCommand, GitCommand, PwdCommand];
  }

  generator() {
    return [RestApiGeneratorCommand];
  }

  installer() {
    return [];
  }

  supporter() {
    return [
      EditHostsCommand,
      ShowConfigurationCommand,
      DatabaseExport,
      DatabaseCreate,
      DatabaseImport,
      DatabaseDelete,
      DatabaseShow,
      ConfigCommand,
      TinyImageCommand
    ];
  }
}
