import { AverageService } from "./average.service";
import { QuoteService } from "./quote/quote.service";

jest.mock("./quote/quote.service");

describe.skip("AverageService", () => {
  let averageService: AverageService;
  let mockQuoteService: jest.Mocked<QuoteService>;

  beforeEach(() => {
    mockQuoteService = new QuoteService() as jest.Mocked<QuoteService>;
    averageService = new AverageService();
  });

  it("should return average prices when valid quotes are provided", async () => {
    mockQuoteService.listAll.mockResolvedValue([
      { source: "Nubank", buy_price: 5.7 * 0.98, sell_price: 5.7 },
      { source: "Wise", buy_price: 5.65, sell_price: 5.65 * 1.02 },
      { source: "Nomad", buy_price: 5.6, sell_price: 5.6 * 1.02 },
    ]);

    const result = await averageService.get();

    const expectedAverageSellPrice = (5.7 + 5.65 * 1.02 + 5.6 * 1.02) / 3;
    const expectedAverageBuyPrice = (5.7 * 0.98 + 5.65 + 5.6) / 3;

    expect(result).toEqual({
      average_sell_price: expectedAverageSellPrice,
      average_buy_price: expectedAverageBuyPrice,
    });
  });

  it("should return null when quoteService returns null", async () => {
    mockQuoteService.listAll.mockResolvedValue(null);

    const result = await averageService.get();

    expect(result).toBeNull();
  });

  it("should handle invalid quotes and return null if there are no valid quotes", async () => {
    mockQuoteService.listAll.mockResolvedValue([
      { source: "Nubank", buy_price: undefined, sell_price: undefined },
      { source: "Wise", buy_price: undefined, sell_price: undefined },
      { source: "Nomad", buy_price: undefined, sell_price: undefined },
    ]);

    const result = await averageService.get();

    expect(result).toBeNull();
  });

  it("should return the correct averages when some quotes are invalid", async () => {
    mockQuoteService.listAll.mockResolvedValue([
      { source: "Nubank", buy_price: 5.7 * 0.98, sell_price: 5.7 },
      { source: "Wise", buy_price: 5.65, sell_price: 5.65 * 1.02 },
      { source: "Nomad", buy_price: undefined, sell_price: undefined },
    ]);

    const result = await averageService.get();

    const expectedAverageSellPrice = (5.7 + 5.65 * 1.02) / 2;
    const expectedAverageBuyPrice = (5.7 * 0.98 + 5.65) / 2;

    expect(result).toEqual({
      average_sell_price: expectedAverageSellPrice,
      average_buy_price: expectedAverageBuyPrice,
    });
  });
});
