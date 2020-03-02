import express from 'express'
let router: express.Router = express.Router();

import dataSourceRouter from "./data-source";
import strategyRouter from "./strategy";
import symbolRouter from "./symbol";

router.use("/data-source", dataSourceRouter);
router.use("/strategy", strategyRouter);
router.use("/symbol", symbolRouter);

export = router;