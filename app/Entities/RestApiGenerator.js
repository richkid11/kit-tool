import path from 'path';
import { NonGeneratorModel } from './NonGeneratorModel';
import { NodeTemplate } from '../Utils/Templates/NodeTemplate';

export const FIELD_TYPE_BIG_INTEGER = 'BIGINT';
export const FIELD_TYPE_BOOLEAN = 'BOOLEAN';
export const FIELD_TYPE_CHAR = 'CHAR';
export const FIELD_TYPE_DATE = 'DATE';
export const FIELD_TYPE_DECIMAL = 'DECIMAL';
export const FIELD_TYPE_DOUBLE = 'DOUBLE';
export const FIELD_TYPE_ENUM = 'ENUM';
export const FIELD_TYPE_FLOAT = 'FLOAT';
export const FIELD_TYPE_INCREMENT = 'INCREMENT';
export const FIELD_TYPE_INTEGER = 'INTEGER';
export const FIELD_TYPE_JSON = 'JSON';
export const FIELD_TYPE_JSONB = 'JSONB';
export const FIELD_TYPE_MEDIUM_INTEGER = 'MEDIUMINT';
export const FIELD_TYPE_SMALL_INTEGER = 'SMALLINT';
export const FIELD_TYPE_TINY_INTEGER = 'TINYINT';
export const FIELD_TYPE_STRING = 'STRING';
export const FIELD_TYPE_TEXT = 'TEXT';
export const FIELD_TYPE_TIME = 'TIME';
export const FIELD_TYPE_REFERENCE = 'REFERENCE';

export const migrationOptions = [
  { type: FIELD_TYPE_BIG_INTEGER, description: 'BIGINT equivalent to the table' },
  { type: FIELD_TYPE_BOOLEAN, description: 'BOOLEAN equivalent to the table' },
  { type: FIELD_TYPE_CHAR, description: 'CHAR equivalent with a length' },
  { type: FIELD_TYPE_DATE, description: 'DATE equivalent to the table' },
  { type: FIELD_TYPE_DECIMAL, description: 'DECIMAL equivalent with a precision and scale' },
  { type: FIELD_TYPE_DOUBLE, description: 'DOUBLE equivalent with precision' },
  { type: FIELD_TYPE_ENUM, description: 'ENUM equivalent to the table' },
  { type: FIELD_TYPE_FLOAT, description: 'FLOAT equivalent to the table' },
  { type: FIELD_TYPE_INTEGER, description: 'INTEGER equivalent to the table' },
  { type: FIELD_TYPE_JSON, description: 'JSON equivalent to the table' },
  { type: FIELD_TYPE_JSONB, description: 'JSONB equivalent to the table' },
  { type: FIELD_TYPE_MEDIUM_INTEGER, description: 'MEDIUMINT equivalent to the table' },
  { type: FIELD_TYPE_SMALL_INTEGER, description: 'SMALLINT equivalent to the table' },
  { type: FIELD_TYPE_TINY_INTEGER, description: 'TINYINT equivalent to the table' },
  { type: FIELD_TYPE_STRING, description: 'VARCHAR equivalent column' },
  { type: FIELD_TYPE_TEXT, description: 'TEXT equivalent to the table' },
  { type: FIELD_TYPE_TIME, description: 'TIME equivalent to the table' },
  { type: FIELD_TYPE_REFERENCE, description: 'reference to other table' }
];

export const primaryField = name => {
  return {
    field: name,
    type: FIELD_TYPE_INTEGER,
    allowNull: false
  };
};

export const addField = (name, type, option = {}) => {
  const field = { field: name, type: type };
  return Object.assign(field, option);
};

export class RestApiGenerator extends NonGeneratorModel {
  constructor() {
    super();
    this.migrations = [];
  }

  setOption(option, value) {
    this[option] = value;
    return this;
  }

  getOption(option) {
    return this[option];
  }

  setMigrations(fields) {
    this.migrations = fields;
    return this;
  }

  getMigrations() {
    return this.migrations;
  }

  addMigration(field) {
    this.migrations = [...this.migrations, ...[field]];
    return this;
  }

  useDefaultMigration() {
    this.setMigrations([{ field: 'id', type: FIELD_TYPE_INCREMENT }]);
  }

  async exec() {
    const file = path.resolve(process.cwd(), this.getOption('router'), `${this.getOption('name').toLowerCase()}.js`)
    const template = new NodeTemplate();
    await template.getRepositoryTemplate(this.getOption('name'));
    await template.getControllerTemplate(this.getOption('name'));
    await template.getModelTemplate(this.getMigrations(), this.getOption('name'));
    await template.getMigrationTemplate(this.getMigrations(), this.getOption('name'));
    await template.getRouterTemplate(file, this.getOption('name'));
  }
}
