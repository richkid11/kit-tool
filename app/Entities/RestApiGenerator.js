import _ from 'lodash';
import { Console } from '@vicoders/console';
import { NonGeneratorModel } from './NonGeneratorModel';

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
    type: FIELD_TYPE_INCREMENT
  };
};

export const addField = (name, type, option = {}) => {
  const field = { field: name, type: type };
  return Object.assign(field, option);
};

export class RestApiGenerator extends NonGeneratorModel {
  constructor() {
    super();
    this.availabel_options = ['name', 'router', 'with'];
    this.migrations = [];
  }

  setOption(option, value) {
    if (option !== 'name' && typeof value === 'string' && value !== '') {
      value = value.toLowerCase();
    }
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
    return JSON.stringify(this.migrations);
  }

  getType() {
    return this.type;
  }

  addMigration(field) {
    this.migrations = [...this.migrations, ...[field]];
    return this;
  }

  useDefaultMigration() {
    this.setMigrations([{ field: 'id', type: FIELD_TYPE_INCREMENT }]);
  }

  isGenerateMigration() {
    return _.isNil(this.with) || this.with === '' || (_.isString(this.with) && _.includes(this.with.split(','), 'migration'));
  }

  async exec() {
    const options = [];
    _.forEach(this.availabel_options, opt => {
      if (!_.isNil(this[opt]) && this[opt] !== '') {
        options.push(`--${opt}=${this[opt]}`);
      }
    });

    options.push(this.generateMigrationOption(this.getMigrations()));
    options.push(`--type=${this.getType()}`);

    const command = `${process.cwd()}/node_modules/.bin/ng generate kit-generate:generator ${options.join(' ')}`;
    await Console.spawn(command);
  }
}
