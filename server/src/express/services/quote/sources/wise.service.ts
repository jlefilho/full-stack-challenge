import axios from "axios";
import { Prices } from "../../../../../../core/interfaces/Prices";

export class WiseService {
  private wiseUrl: string = "https://wise.com/rates/history+live";

  async fetchCurrencyRates(): Promise<Prices | null> {
    try {
      const result = await axios.get(this.wiseUrl, {
        params: {
          source: "USD",
          target: "BRL",
          length: 30,
          resolution: "hourly",
          unit: "day",
        },
      });

      const price = result.data?.[result.data.length - 1]?.value;

      if (!price) {
        return null;
      }

      return {
        buyPrice: price,
        sellPrice: price * 1.02,
      };
    } catch (error) {
      console.error("Error fetching Wise exchange rates::", error);
      return null;
    }
  }
}
