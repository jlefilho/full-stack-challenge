import axios from "axios";
import { NomadService } from "./nomad.service";

jest.mock("axios");

describe("NomadService", () => {
  let nomadService: NomadService;

  beforeEach(() => {
    nomadService = new NomadService();
  });

  it("should return correct buy and sell prices when response is successful", async () => {
    const mockResponse = {
      data: {
        history: [
          {
            rates: {
              dolar_exchange: 5.7,
            },
          },
        ],
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await nomadService.fetchCurrencyRates();

    expect(result).not.toBeNull();
    expect(result?.buyPrice).toBe(5.7);
    expect(result?.sellPrice).toBe(5.7 * 1.02);
  });

  it("should return null when there is no dolar_exchange in the response", async () => {
    const mockResponse = {
      data: {
        history: [
          {
            rates: {
              dolar_exchange: null,
            },
          },
        ],
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await nomadService.fetchCurrencyRates();

    expect(result).toBeNull();
  });

  it("should return null when the response does not contain history", async () => {
    const mockResponse = {
      data: {},
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await nomadService.fetchCurrencyRates();

    expect(result).toBeNull();
  });

  it("should return null when there is an error fetching the rates", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Request failed"));

    const result = await nomadService.fetchCurrencyRates();

    expect(result).toBeNull();
  });
});
