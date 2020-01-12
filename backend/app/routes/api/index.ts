import express from 'express'
let router: express.Router = express.Router();

import dataSourceRouter from "./data-source";
import strategyRouter from "./strategy";
import symbolRouter from "./symbol";
import candlesRouter from "./candles";

router.use("/data-source", dataSourceRouter);
router.use("/strategy", strategyRouter);
router.use("/symbol", symbolRouter);
router.use("/candles", candlesRouter);

export = router;