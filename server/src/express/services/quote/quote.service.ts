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
        sell_price: nubankService ? nubankService.sellPrice : null,
        buy_price: nubankService ? nubankService.buyPrice : null,
      },
      {
        source: "Wise",
        sell_price: wiseRates ? wiseRates.sellPrice : null,
        buy_price: wiseRates ? wiseRates.buyPrice : null,
      },
      {
        source: "Nomad",
        sell_price: nomadRates ? nomadRates.sellPrice : null,
        buy_price: nomadRates ? nomadRates.buyPrice : null,
      },
    ] as Quote[];
  }
}
