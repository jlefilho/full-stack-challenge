"use client";

import { QuoteCard } from "@/components/quote-card";
import { useQuotesData } from "@/hooks/useQuotesData";

export default function Home() {
  const { data, isLoading, isError } = useQuotesData();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading data</div>;

  return (
    <main
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
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
    </main>
  );
}
