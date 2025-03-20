import { NubankService } from "./sources/nubank.service";
import { NomadService } from "./sources/nomad.service";
import { WiseService } from "./sources/wise.service";
import { Quote } from "../../../../../core/interfaces/Quote";
import {
  QuoteSourceMapping,
  QUOTE_SOURCE,
} from "../../../../../core/interfaces/QuoteSources";

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
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Nubank].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Nubank].source,
        sell_price: nubankService ? nubankService.sellPrice : null,
        buy_price: nubankService ? nubankService.buyPrice : null,
      },
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Wise].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Wise].source,
        sell_price: wiseRates ? wiseRates.sellPrice : null,
        buy_price: wiseRates ? wiseRates.buyPrice : null,
      },
      {
        display_name: QuoteSourceMapping[QUOTE_SOURCE.Nomad].display_name,
        source: QuoteSourceMapping[QUOTE_SOURCE.Nomad].source,
        sell_price: nomadRates ? nomadRates.sellPrice : null,
        buy_price: nomadRates ? nomadRates.buyPrice : null,
      },
    ] as Quote[];
  }
}
