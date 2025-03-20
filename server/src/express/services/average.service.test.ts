import {
  QuoteSourceMapping,
  QUOTE_SOURCE,
} from "../../../../core/interfaces/QuoteSources";
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
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Nomad].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Nomad].source,
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
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Nomad].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Nomad].source,
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
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Nubank].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Nubank].source,
        buy_price: null,
        sell_price: null,
      },
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Wise].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Wise].source,
        buy_price: null,
        sell_price: null,
      },
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Nomad].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Nomad].source,
        buy_price: null,
        sell_price: null,
      },
    ]);

    const result = await averageService.get();

    expect(result).toBeNull();
  });
});
