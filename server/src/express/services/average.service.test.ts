import { AverageService } from "./average.service";
import { QuoteService } from "./quote/quote.service";

jest.mock("./quote/quote.service");

describe("AverageService", () => {
  let averageService: AverageService;

  beforeEach(() => {
    averageService = new AverageService();
  });

  it("should return average sell and buy prices when valid quotes are returned", async () => {
    jest.spyOn(QuoteService.prototype, "listAll").mockResolvedValue([
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
      {
        source: "Nomad",
        buy_price: 5.6,
        sell_price: 5.6 * 1.02,
      },
    ]);

    const result = await averageService.get();

    expect(result).toEqual({
      average_sell_price: (5.7 + 5.65 * 1.02 + 5.6 * 1.02) / 3,
      average_buy_price: (5.7 * 0.98 + 5.65 + 5.6) / 3,
    });
  });

  it("should return average sell and buy prices only for valid quotes", async () => {
    jest.spyOn(QuoteService.prototype, "listAll").mockResolvedValue([
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
      {
        source: "Nomad",
        buy_price: null,
        sell_price: null,
      },
    ]);

    const result = await averageService.get();

    expect(result).toEqual({
      average_sell_price: (5.7 + 5.65 * 1.02) / 2,
      average_buy_price: (5.7 * 0.98 + 5.65) / 2,
    });
  });

  it("should return null if no valid quotes are returned", async () => {
    jest.spyOn(QuoteService.prototype, "listAll").mockResolvedValue([
      {
        source: "Nubank",
        buy_price: null,
        sell_price: null,
      },
      {
        source: "Wise",
        buy_price: null,
        sell_price: null,
      },
      {
        source: "Nomad",
        buy_price: null,
        sell_price: null,
      },
    ]);

    const result = await averageService.get();

    expect(result).toBeNull();
  });
});
