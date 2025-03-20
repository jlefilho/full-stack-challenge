import { SlippageService } from "./slippage.service";
import { AverageService } from "./average.service";
import { QuoteService } from "./quote/quote.service";
import {
  QuoteSourceMapping,
  QUOTE_SOURCE,
} from "../../../../core/interfaces/QuoteSources";

jest.mock("./quote/quote.service");
jest.mock("./average.service");

describe("SlippageService", () => {
  let slippageService: SlippageService;

  beforeEach(() => {
    slippageService = new SlippageService();
  });

  it("should return slippage values for sell and buy prices when valid data is returned", async () => {
    jest.spyOn(AverageService.prototype, "get").mockResolvedValue({
      average_sell_price: 5.8,
      average_buy_price: 5.5,
    });

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

    const result = await slippageService.listAll();

    expect(result).toEqual([
      {
        source: QuoteSourceMapping[QUOTE_SOURCE.Nubank].source,
        sell_price_slippage: ((5.7 - 5.8) / 5.8) * 100,
        buy_price_slippage: ((5.7 * 0.98 - 5.5) / 5.5) * 100,
      },
      {
        source: QuoteSourceMapping[QUOTE_SOURCE.Wise].source,
        sell_price_slippage: ((5.65 * 1.02 - 5.8) / 5.8) * 100,
        buy_price_slippage: ((5.65 - 5.5) / 5.5) * 100,
      },
      {
        source: QuoteSourceMapping[QUOTE_SOURCE.Nomad].source,
        sell_price_slippage: ((5.6 * 1.02 - 5.8) / 5.8) * 100,
        buy_price_slippage: ((5.6 - 5.5) / 5.5) * 100,
      },
    ]);
  });

  it("should return null if average data is not available", async () => {
    jest.spyOn(AverageService.prototype, "get").mockResolvedValue(null);
    jest.spyOn(QuoteService.prototype, "listAll").mockResolvedValue([
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Nubank].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Nubank].source,
        buy_price: 5.7 * 0.98,
        sell_price: 5.7,
      },
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Nomad].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Nomad].source,
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

    const result = await slippageService.listAll();

    expect(result).toBeNull();
  });

  it("should return null if quote data is not available", async () => {
    jest.spyOn(AverageService.prototype, "get").mockResolvedValue({
      average_sell_price: 5.8,
      average_buy_price: 5.5,
    });

    jest.spyOn(QuoteService.prototype, "listAll").mockResolvedValue(null);

    const result = await slippageService.listAll();

    expect(result).toBeNull();
  });

  it("should return null if any quote has null values", async () => {
    jest.spyOn(AverageService.prototype, "get").mockResolvedValue({
      average_sell_price: 5.8,
      average_buy_price: 5.5,
    });

    jest.spyOn(QuoteService.prototype, "listAll").mockResolvedValue([
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Nubank].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Nubank].source,
        buy_price: 5.7 * 0.98,
        sell_price: 5.7,
      },
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Nomad].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Nomad].source,
        buy_price: null,
        sell_price: null,
      },
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Nomad].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Nomad].source,
        buy_price: 5.6,
        sell_price: 5.6 * 1.02,
      },
    ]);

    const result = await slippageService.listAll();

    expect(result).toEqual([
      {
        source: QuoteSourceMapping[QUOTE_SOURCE.Nubank].source,
        sell_price_slippage: ((5.7 - 5.8) / 5.8) * 100,
        buy_price_slippage: ((5.7 * 0.98 - 5.5) / 5.5) * 100,
      },
      {
        source: QuoteSourceMapping[QUOTE_SOURCE.Nomad].source,
        sell_price_slippage: null,
        buy_price_slippage: null,
      },
      {
        source: QuoteSourceMapping[QUOTE_SOURCE.Nomad].source,
        sell_price_slippage: ((5.6 * 1.02 - 5.8) / 5.8) * 100,
        buy_price_slippage: ((5.6 - 5.5) / 5.5) * 100,
      },
    ]);
  });
});
