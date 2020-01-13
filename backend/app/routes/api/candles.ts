import express from 'express'
let router: express.Router = express.Router();
import * as eventHandler from '../../event-handler'

router.get('/:dataSource/:symbol/:period', /*roles.can('api/opportunity'),*/ async function (req, res, next) {
  let dataSourceInst = await import('../../data-sources/' + req.params.dataSource + '/api');
  const result = await dataSourceInst.getCandles(req.params.symbol, req.params.period);
  eventHandler.em.emit(eventHandler.RETRIEVED_CANDLES, result);
  res.json({ candles: result });
});

export = router;