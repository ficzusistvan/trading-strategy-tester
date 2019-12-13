import express from 'express'
let router: express.Router = express.Router();

import opportunityRouter from "./opportunity";
//const productRoutes = require("./product");

router.use("/opportunity", opportunityRouter);
//router.use("/product", productRoutes);

export = router;