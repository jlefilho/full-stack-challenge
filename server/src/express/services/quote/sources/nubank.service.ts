import axios from "axios";
import * as cheerio from "cheerio";
import { Prices } from "../../../../../../core/interfaces/Prices";

export class NubankService {
  private nubankUrl: string =
    "https://www.nubank.com.br/dados-abertos/taxas-conversao";

  async fetchCurrencyRates(): Promise<Prices | null> {
    try {
      const { data } = await axios.get(this.nubankUrl);

      const $ = cheerio.load(data);

      const dolarPriceElement = $(
        "table.chakra-table.css-8atqhb tbody tr td.css-1u82tlj"
      )
        .first()
        .text()
        .trim();

      const dolarPrice = parseFloat(
        dolarPriceElement.replace("R$", "").replace(",", ".")
      );
      return {
        buyPrice: dolarPrice * 0.98,
        sellPrice: dolarPrice,
      };
    } catch (error) {
      console.error("Error fetching Nubank exchange rates:", error);
      return null;
    }
  }
}
