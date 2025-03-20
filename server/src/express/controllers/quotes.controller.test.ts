import request from "supertest";
import { QuotesController } from "./quotes.controller";
import { QuoteService } from "../services/quote/quote.service";
import {
  QuoteSourceMapping,
  QUOTE_SOURCE,
} from "../../../../core/interfaces/QuoteSources";

jest.mock("../services/quote/quote.service");

describe("QuotesController", () => {
  let app: any;

  beforeAll(() => {
    const router = QuotesController.router();
    const express = require("express");
    app = express();
    app.use("/quotes", router);
  });

  it("should return 200 and quotes when QuoteService resolves", async () => {
    (QuoteService.prototype.listAll as jest.Mock).mockResolvedValue([
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Nubank].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Nubank].source,
        buy_price: 5.7 * 0.98,
        sell_price: 5.7,
      },
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Wise].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Wise].source,
        buy_price: 5.65,
        sell_price: 5.65 * 1.02,
      },
    ]);

    const response = await request(app).get("/quotes");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Nubank].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Nubank].source,
        buy_price: 5.7 * 0.98,
        sell_price: 5.7,
      },
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Wise].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Wise].source,
        buy_price: 5.65,
        sell_price: 5.65 * 1.02,
      },
    ]);
  });

  it("should return 500 and error when QuoteService rejects", async () => {
    (QuoteService.prototype.listAll as jest.Mock).mockRejectedValue(
      new Error("Service error")
    );

    const response = await request(app).get("/quotes");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Service error",
    });
  });
});
