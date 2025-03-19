import axios from "axios";
import { NubankService } from "./nubank.service";

jest.mock("axios");

describe("NubankService", () => {
  let nubankService: NubankService;

  beforeEach(() => {
    nubankService = new NubankService();
  });

  it("should return correct buy and sell prices when response is successful", async () => {
    const mockHtml = `
      <table class="chakra-table css-8atqhb">
        <tbody>
          <tr>
            <td class="css-1u82tlj">R$ 5,70</td>
          </tr>
        </tbody>
      </table>
    `;

    (axios.get as jest.Mock).mockResolvedValue({ data: mockHtml });

    const result = await nubankService.fetchCurrencyRates();

    expect(result).not.toBeNull();
    expect(result?.buyPrice).toBe(5.7 * 0.98);
    expect(result?.sellPrice).toBe(5.7);
  });

  it("should return null when there is an error fetching the rates", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Request failed"));

    const result = await nubankService.fetchCurrencyRates();

    expect(result).toBeNull();
  });
});
