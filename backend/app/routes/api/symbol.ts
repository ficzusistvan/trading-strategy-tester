import express from 'express'
let router: express.Router = express.Router();

router.get('/search/:dataSource/:keyword', /*roles.can('api/opportunity'),*/ async function (req, res, next) {
  console.log(req.params.dataSource);
  console.log(req.params.keyword);
  let dataSourceInst = await import('../../data-sources/' + req.params.dataSource + '/api');
  const result = await dataSourceInst.searchSymbol(req.params.keyword);
  res.json({ symbols: result });
});

export = router;