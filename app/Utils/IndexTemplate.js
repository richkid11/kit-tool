import fse from 'fs-extra';
// import path from 'path';
export class IndexTemplate {
  getIndexTemplate(file) {
    // const file = path.resolve(process.cwd(), pathRouter, `index.js`);
    const content = `
    import express from 'express';
    
    var router = express.Router();
    
    export default router;`;
    fse.outputFileSync(file, content);
  }
}
