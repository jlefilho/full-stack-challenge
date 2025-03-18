import { NomadService } from "./sources/nomad.service";
import { WiseService } from "./sources/wise.service";
import { Quote } from "../../../../../core/interfaces/Quote";

export class QuoteService {
  private wiseService: WiseService;
  private nomadService: NomadService;

  constructor() {
    this.wiseService = new WiseService();
    this.nomadService = new NomadService();
  }

  async listAll(): Promise<Quote[] | null> {
    const wiseRates = await this.wiseService.fetchCurrencyRates();
    const nomadRates = await this.nomadService.fetchCurrencyRates();

    return [
      { source: "Nubank", sell_price: 5.8, buy_price: 5.78 },
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
