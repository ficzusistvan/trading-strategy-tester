import express from 'express'
let router: express.Router = express.Router();

router.get('/:dataSource/:symbol/:period', /*roles.can('api/opportunity'),*/ async function (req, res, next) {
  console.log(req.params.dataSource);
  console.log(req.params.symbol);
  console.log(req.params.period);
  let dataSourceInst = await import('../../data-sources/' + req.params.dataSource + '/api');
  const result = await dataSourceInst.getCandles(req.params.symbol, req.params.period);
  console.log(result);
  res.json({ candles: result });
});

export = router;