import { Average } from "../../../../core/interfaces/Average";

export class AverageService {
  async get(): Promise<Average | null> {
    return {
      average_sell_price: 144,
      average_buy_price: 140.9,
    } as Average;
  }
}
