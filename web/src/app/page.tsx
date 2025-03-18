"use client";

import { useState } from "react";
import { AveragesCard } from "@/components/averages-card";
import { QuoteCard } from "@/components/quote-card";
import { useQuotesData } from "@/hooks/useQuotesData";
import { CurrencyToggle } from "@/components/currency-toggle";

export default function Home() {
  const { data, isLoading, isError } = useQuotesData();
  const [isUSDToBRL, setIsUSDToBRL] = useState(true);

  const handleToggle = (newState: boolean) => {
    setIsUSDToBRL(newState);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading data</div>;

  return (
    <main
      className="min-h-screen bg-primary p-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="flex justify-center mb-6">
          <CurrencyToggle onToggle={handleToggle} isUSDToBRL={isUSDToBRL} />
        </div>

        <div className="flex justify-center md:justify-center mb-6">
          <AveragesCard
            averageBuyPrice={data[0].averageBuyPrice}
            averageSellPrice={data[0].averageSellPrice}
            isUSDToBRL={isUSDToBRL}
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
              isUSDToBRL={isUSDToBRL}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
