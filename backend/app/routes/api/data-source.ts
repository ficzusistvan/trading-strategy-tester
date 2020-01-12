import express from 'express'
import * as dataSource from '../../data-source'
let router: express.Router = express.Router();

router.get('/list', /*roles.can('api/opportunity'),*/ async function (req, res, next) {
  const result = await dataSource.getSources();
  res.json({ dataSources: result });
});

export = router;