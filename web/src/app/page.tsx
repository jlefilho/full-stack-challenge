"use client";

import { QuoteCard } from "@/components/quote-card";
import { AveragesCard } from "@/components/averages-card";
import { useQuotesData } from "@/hooks/useQuotesData";
import { CurrencyProvider } from "@/contexts/currency-context";
import { CurrencyToggle } from "@/components/currency-toggle";

export default function Home() {
  const { data, isLoading, isError } = useQuotesData();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading data</div>;

  return (
    <main
      className="min-h-screen bg-primary p-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <CurrencyProvider>
        <div className="max-w-screen-lg mx-auto px-4">
          <div className="flex justify-center mb-6">
            <CurrencyToggle />
          </div>

          <div className="flex justify-center md:justify-center mb-6">
            <AveragesCard
              averageBuyPrice={data[0].averageBuyPrice}
              averageSellPrice={data[0].averageSellPrice}
            />
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            {data.map((item, index) => (
              <QuoteCard
                key={index}
                buyPrice={item.buyPrice}
                sellPrice={item.sellPrice}
                source={item.source}
                buyPriceSlippage={item.buyPriceSlippage}
                sellPriceSlippage={item.sellPriceSlippage}
                updatedAt={item.updatedAt}
              />
            ))}
          </div>
        </div>
      </CurrencyProvider>
    </main>
  );
}
