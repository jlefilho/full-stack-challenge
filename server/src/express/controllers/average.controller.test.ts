import request from "supertest";
import { AverageController } from "./average.controller";
import { AverageService } from "../services/average.service";

jest.mock("../services/average.service");

describe("AverageController", () => {
  let app: any;

  beforeAll(() => {
    const router = AverageController.router();
    const express = require("express");
    app = express();
    app.use("/average", router);
  });

  it("should return 200 and average data when AverageService resolves", async () => {
    const mockAverage = {
      average_sell_price: 5.7,
      average_buy_price: 5.5,
    };

    (AverageService.prototype.get as jest.Mock).mockResolvedValue(mockAverage);

    const response = await request(app).get("/average");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAverage);
  });

  it("should return 500 and error message when AverageService rejects", async () => {
    (AverageService.prototype.get as jest.Mock).mockRejectedValue(
      new Error("Service error")
    );

    const response = await request(app).get("/average");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Service error",
    });
  });
});
