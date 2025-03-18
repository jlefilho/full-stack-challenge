import { Average } from "../../../../core/interfaces/Average";
import { QuoteService } from "./quote/quote.service";

export class AverageService {
  private quoteService: QuoteService;

  constructor() {
    this.quoteService = new QuoteService();
  }

  async get(): Promise<Average | null> {
    const quotes = await this.quoteService.listAll();

    if (quotes === null) {
      return null;
    }

    const validQuotes = quotes.filter(
      (quote) => quote.sell_price !== null && quote.buy_price !== null
    );

    if (validQuotes.length === 0) {
      return null;
    }

    const totalSellPrice = validQuotes.reduce(
      (acc, quote) => acc + quote.sell_price!,
      0
    );
    const totalBuyPrice = validQuotes.reduce(
      (acc, quote) => acc + quote.buy_price!,
      0
    );

    const average_sell_price = totalSellPrice / validQuotes.length;
    const average_buy_price = totalBuyPrice / validQuotes.length;

    return {
      average_sell_price,
      average_buy_price,
    } as Average;
  }
}
