import { QuoteService } from "./quote.service";
import { NubankService } from "./sources/nubank.service";
import { NomadService } from "./sources/nomad.service";
import { WiseService } from "./sources/wise.service";

jest.mock("./sources/nubank.service");
jest.mock("./sources/nomad.service");
jest.mock("./sources/wise.service");

describe.skip("QuoteService", () => {
  let quoteService: QuoteService;
  let mockNubankService: jest.Mocked<NubankService>;
  let mockNomadService: jest.Mocked<NomadService>;
  let mockWiseService: jest.Mocked<WiseService>;

  beforeEach(() => {
    mockNubankService = new NubankService() as jest.Mocked<NubankService>;
    mockNomadService = new NomadService() as jest.Mocked<NomadService>;
    mockWiseService = new WiseService() as jest.Mocked<WiseService>;
    quoteService = new QuoteService();
  });

  it("should return a list of quotes from all services", async () => {
    mockNubankService.fetchCurrencyRates.mockResolvedValue({
      buyPrice: 5.7 * 0.98,
      sellPrice: 5.7,
    });

    mockWiseService.fetchCurrencyRates.mockResolvedValue({
      buyPrice: 5.65,
      sellPrice: 5.65 * 1.02,
    });

    mockNomadService.fetchCurrencyRates.mockResolvedValue({
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

  it("should handle null values when a service returns null", async () => {
    mockNubankService.fetchCurrencyRates.mockResolvedValue({
      buyPrice: 5.7 * 0.98,
      sellPrice: 5.7,
    });

    mockWiseService.fetchCurrencyRates.mockResolvedValue({
      buyPrice: 5.65,
      sellPrice: 5.65 * 1.02,
    });

    mockNomadService.fetchCurrencyRates.mockResolvedValue(null);

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
        buy_price: undefined,
        sell_price: undefined,
      },
    ]);
  });

  it("should handle errors and return null for all services if there are any errors", async () => {
    mockNubankService.fetchCurrencyRates.mockRejectedValue(
      new Error("Nubank error")
    );
    mockWiseService.fetchCurrencyRates.mockRejectedValue(
      new Error("Wise error")
    );
    mockNomadService.fetchCurrencyRates.mockRejectedValue(
      new Error("Nomad error")
    );

    const result = await quoteService.listAll();

    expect(result).toBeNull();
  });
});
