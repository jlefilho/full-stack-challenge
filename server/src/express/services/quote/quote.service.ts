import { NubankService } from "./sources/nubank.service";
import { NomadService } from "./sources/nomad.service";
import { WiseService } from "./sources/wise.service";
import { Quote } from "../../../../../core/interfaces/Quote";

export class QuoteService {
  private wiseService: WiseService;
  private nomadService: NomadService;
  private nubankService: NubankService;

  constructor() {
    this.wiseService = new WiseService();
    this.nomadService = new NomadService();
    this.nubankService = new NubankService();
  }

  async listAll(): Promise<Quote[] | null> {
    const nubankService = await this.nubankService.fetchCurrencyRates();
    const wiseRates = await this.wiseService.fetchCurrencyRates();
    const nomadRates = await this.nomadService.fetchCurrencyRates();

    return [
      {
        source: "Nubank",
        sell_price: nubankService?.sellPrice,
        buy_price: nubankService?.buyPrice,
      },
      {
        source: "Wise",
        buy_price: wiseRates?.buyPrice,
        sell_price: wiseRates?.sellPrice,
      },
      {
        source: "Nomad",
        buy_price: nomadRates?.buyPrice,
        sell_price: nomadRates?.sellPrice,
      },
    ] as Quote[];
  }
}
