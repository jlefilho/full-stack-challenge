import request from "supertest";
import { SlippageController } from "./slippage.controller";
import { SlippageService } from "../services/slippage.service";

jest.mock("../services/slippage.service");

describe("SlippageController", () => {
  let app: any;

  beforeAll(() => {
    const router = SlippageController.router();
    const express = require("express");
    app = express();
    app.use("/slippage", router);
  });

  it("should return 200 and slippage data when SlippageService resolves", async () => {
    (SlippageService.prototype.listAll as jest.Mock).mockResolvedValue([
      {
        source: "Nubank",
        buy_price: 5.7 * 0.98,
        sell_price: 5.7,
      },
      {
        source: "Wise",
        buy_price: 5.65,
        sell_price: 5.65 * 1.02,
      },
    ]);

    const response = await request(app).get("/slippage");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        source: "Nubank",
        buy_price: 5.7 * 0.98,
        sell_price: 5.7,
      },
      {
        source: "Wise",
        buy_price: 5.65,
        sell_price: 5.65 * 1.02,
      },
    ]);
  });

  it("should return 500 and error message when SlippageService rejects", async () => {
    (SlippageService.prototype.listAll as jest.Mock).mockRejectedValue(
      new Error("Service error")
    );

    const response = await request(app).get("/slippage");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Service error",
    });
  });
});
