import express from 'express'
let router: express.Router = express.Router();
import path from 'path'
import fs from 'fs'
import { logger } from '../../logger'

const dirPath = path.join(__dirname, '../../strategies');

router.get('/list', /*roles.can('api/opportunity'),*/ async function (req, res, next) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return logger.error('Unable to scan directory', err);
    }
    res.json({ strategies: files });
  });
});

export = router;