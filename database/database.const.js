import Os from '../app/Utils/Os/Os';
import Win from '../app/Utils/Os/Win';
import Linux from '../app/Utils/Os/Linux';
import Darwin from '../app/Utils/Os/Darwin';

export const getInternalDatabasePath = () => {
  return `${__dirname}/../data/vcc.db`;
};

export const getDatabasePath = () => {
  let dbpath = `${__dirname}/../data/vcc.db`;
  const os = new Os().platform();

  if (os === 'win32') {
    const userinfo = new Win().userInfo();
    dbpath = `${userinfo.homedir}/.npm/kit/data/vcc.db`;
  } else if (os === 'linux') {
    const userinfo = new Linux().userInfo();
    dbpath = `${userinfo.homedir}/.npm/kit/data/vcc.db`;
  } else if (os === 'darwin') {
    const userinfo = new Darwin().userInfo();
    dbpath = `${userinfo.homedir}/.npm/kit/data/vcc.db`;
  }
  return dbpath;
};

export const isInternalDatabase = () => {
  return getDatabasePath() === getInternalDatabasePath();
};
