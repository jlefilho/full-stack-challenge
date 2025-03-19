import axios from "axios";
import { Prices } from "../../../../../../core/interfaces/Prices";

export class NomadService {
  private nomadUrl: string =
    "https://api.benomad.us/forex-rates-s3/v1/exchanges:30-days";

  async fetchCurrencyRates(): Promise<Prices | null> {
    try {
      const response = await axios.get(this.nomadUrl);

      const latestData = response.data.history?.[0];
      const price = latestData?.rates?.dolar_exchange;

      if (!price) return null;

      return {
        buyPrice: price,
        sellPrice: price * 1.02,
      };
    } catch (error) {
      console.error("Error fetching Nomad exchange rates:", error);
      return null;
    }
  }
}
