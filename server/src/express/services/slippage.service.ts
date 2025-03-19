import { Slippage } from "../../../../core/interfaces/Slippage";
import { AverageService } from "./average.service";
import { QuoteService } from "./quote/quote.service";

export class SlippageService {
  private averageService: AverageService;
  private quoteService: QuoteService;

  constructor() {
    this.averageService = new AverageService();
    this.quoteService = new QuoteService();
  }

  private calculateSlippage(
    price: number | undefined,
    average: number | null
  ): number | null {
    if (!price || !average) return null;
    return ((price - average) / average) * 100;
  }

  async listAll(): Promise<Slippage[] | null> {
    const average = await this.averageService.get();

    if (!average) return null;

    const quotes = await this.quoteService.listAll();

    if (!quotes) return null;

    const slippageResults: Slippage[] = quotes.map((quote) => {
      const sellPriceSlippage = this.calculateSlippage(
        quote.sell_price,
        average.average_sell_price
      );
      const buyPriceSlippage = this.calculateSlippage(
        quote.buy_price,
        average.average_buy_price
      );

      return {
        source: quote.source,
        sell_price_slippage: sellPriceSlippage,
        buy_price_slippage: buyPriceSlippage,
      };
    });

    return slippageResults;
  }
}
