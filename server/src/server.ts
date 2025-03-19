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

server.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Currenzy API! Here are the available routes:",
    routes: {
      "/quotes": {
        description:
          "Returns the buy and sell exchange rates for dollar from various sources.",
        method: "GET",
        response: {
          description:
            "An array of objects, each containing the source, buy and sell prices.",
        },
      },
      "/average": {
        description:
          "Returns the average buy and sell prices from the quotes above.",
        method: "GET",
        response: {
          description: "An object containing the average buy and sell prices.",
        },
      },
      "/slippage": {
        description:
          "Returns an array of objects with the slippage percentage between each source and the average.",
        method: "GET",
        response: {
          description:
            "An array of objects, each containing the source and its corresponding slippage percentages for buy and sell prices.",
        },
      },
    },
  });
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
