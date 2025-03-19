import { QuoteService } from "./quote.service";
import { NubankService } from "./sources/nubank.service";
import { NomadService } from "./sources/nomad.service";
import { WiseService } from "./sources/wise.service";

describe("QuoteService", () => {
  let quoteService: QuoteService;

  beforeEach(() => {
    quoteService = new QuoteService();
  });

  it("should return a list of quotes from all services", async () => {
    jest
      .spyOn(NubankService.prototype, "fetchCurrencyRates")
      .mockResolvedValue({
        buyPrice: 5.7 * 0.98,
        sellPrice: 5.7,
      });

    jest.spyOn(WiseService.prototype, "fetchCurrencyRates").mockResolvedValue({
      buyPrice: 5.65,
      sellPrice: 5.65 * 1.02,
    });

    jest.spyOn(NomadService.prototype, "fetchCurrencyRates").mockResolvedValue({
      buyPrice: 5.6,
      sellPrice: 5.6 * 1.02,
    });

    const result = await quoteService.listAll();

    expect(result).toEqual([
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
  });

  it("should return null values when a service returns null", async () => {
    jest
      .spyOn(NubankService.prototype, "fetchCurrencyRates")
      .mockResolvedValue({
        buyPrice: 5.7 * 0.98,
        sellPrice: 5.7,
      });

    jest.spyOn(WiseService.prototype, "fetchCurrencyRates").mockResolvedValue({
      buyPrice: 5.65,
      sellPrice: 5.65 * 1.02,
    });

    jest
      .spyOn(NomadService.prototype, "fetchCurrencyRates")
      .mockResolvedValue(null);

    const result = await quoteService.listAll();

    expect(result).toEqual([
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
  });
});
