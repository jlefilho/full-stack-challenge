"use client";

import useSWR from "swr";
import { Quote } from "../../../core/interfaces/Quote";
import { Average } from "../../../core/interfaces/Average";
import { Slippage } from "../../../core/interfaces/Slippage";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useQuotesData() {
  const { data: quotes, error: quotesError } = useSWR(
    "http://localhost:8000/quotes",
    fetcher,
    {
      refreshInterval: 15000,
    }
  );
  const { data: average, error: averageError } = useSWR(
    "http://localhost:8000/average",
    fetcher,
    {
      refreshInterval: 15000,
    }
  );
  const { data: slippage, error: slippageError } = useSWR(
    "http://localhost:8000/slippage",
    fetcher,
    { refreshInterval: 15000 }
  );

  const isLoading = !quotes || !average || !slippage;
  const isError = quotesError || averageError || slippageError;

  return {
    data: isLoading ? null : mergeData(quotes, average, slippage),
    isLoading,
    isError,
  };
}

function mergeData(quotes: Quote[], average: Average, slippage: Slippage[]) {
  return quotes.map((quote) => {
    const slippageData = slippage.find((s) => s.source === quote.source);
    return {
      source: quote.source,
      buyPrice: quote.buy_price,
      sellPrice: quote.sell_price,
      averageBuyPrice: average.average_buy_price,
      averageSellPrice: average.average_sell_price,
      buyPriceSlippage: slippageData ? slippageData.buy_price_slippage : 0,
      sellPriceSlippage: slippageData ? slippageData.sell_price_slippage : 0,
      updatedAt: new Date().toISOString(),
    };
  });
}
