import express from "express";
import { QuotesController } from "./express/controllers/quotes.controller";
import { AverageController } from "./express/controllers/average.controller";
import { SlippageController } from "./express/controllers/slippage.controller";

const server = express();
server.use(express.json());

server.use("/quotes", QuotesController.router());
server.use("/average", AverageController.router());
server.use("/slippage", SlippageController.router());

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
