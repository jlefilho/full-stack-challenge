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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="col-span-full lg:col-span-3">
        <CurrencyToggle onToggle={handleToggle} isUSDToBRL={isUSDToBRL} />
      </div>

      <div className="col-span-full lg:col-span-3">
        <AveragesCard
          averageBuyPrice={data[0].averageBuyPrice}
          averageSellPrice={data[0].averageSellPrice}
          updatedAt={data[0].updatedAt}
          isUSDToBRL={isUSDToBRL}
        />
      </div>

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
    </main>
  );
}
