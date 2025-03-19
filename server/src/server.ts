import cors from "cors";
import express from "express";
import { QuotesController } from "./express/controllers/quotes.controller";
import { AverageController } from "./express/controllers/average.controller";
import { SlippageController } from "./express/controllers/slippage.controller";

const server = express();
server.use(express.json());
server.use(cors());

server.use("/quotes", QuotesController.router());
server.use("/average", AverageController.router());
server.use("/slippage", SlippageController.router());

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
