import axios from "axios";
import { WiseService } from "./wise.service";

jest.mock("axios");

describe("WiseService", () => {
  let wiseService: WiseService;

  beforeEach(() => {
    wiseService = new WiseService();
  });

  it("should return correct buy and sell prices when response is successful", async () => {
    const mockResponse = {
      data: [{ value: 5.65 }, { value: 5.7 }],
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await wiseService.fetchCurrencyRates();

    expect(result).not.toBeNull();
    expect(result?.buyPrice).toBe(5.7);
    expect(result?.sellPrice).toBe(5.7 * 1.02);
  });

  it("should return null when there is no valid price in the response", async () => {
    const mockResponse = {
      data: [{ value: null }],
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await wiseService.fetchCurrencyRates();

    expect(result).toBeNull();
  });

  it("should return null when the response does not contain data", async () => {
    const mockResponse = {};

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await wiseService.fetchCurrencyRates();

    expect(result).toBeNull();
  });

  it("should return null when there is an error fetching the rates", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Request failed"));

    const result = await wiseService.fetchCurrencyRates();

    expect(result).toBeNull();
  });
});
