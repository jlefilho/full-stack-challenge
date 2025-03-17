import { Quote } from "../../../../core/interfaces/Quote";

export class QuoteService {
  async listAll(): Promise<Quote[] | null> {
    return [
      { source: "Nubank", sell_price: 144, buy_price: 140.3 },
      { source: "Wise", sell_price: 143, buy_price: 140.8 },
      { source: "Nomad", sell_price: 145, buy_price: 141.3 },
    ] as Quote[];
  }
}
