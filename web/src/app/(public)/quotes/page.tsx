"use client";

import { QuoteCard } from "@/components/quote-card";
import { AveragesCard } from "@/components/averages-card";
import { useQuotesData } from "@/hooks/useQuotesData";
import Link from "next/link";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
import { useFilterContext } from "@/contexts/filter-context";
import { FilterSelect } from "@/components/filter-select";

export default function Quotes() {
  const { data, isLoading, isError } = useQuotesData();
  const { sortOption } = useFilterContext();

  const handleRetry = (): void => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <main
        className="min-h-[75vh] flex justify-center items-center p-10"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <Loading />
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main
        className="min-h-[75vh]  flex justify-center items-center p-10"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <Error onRetry={handleRetry} />
      </main>
    );
  }

  const sortedData = [...data].sort((a, b) => {
    switch (sortOption) {
      case "alphabetical":
        return a.displayName.localeCompare(b.displayName);
      case "buyPriceAsc":
        return (a.buyPrice ?? 0) - (b.buyPrice ?? 0);
      case "buyPriceDesc":
        return (b.buyPrice ?? 0) - (a.buyPrice ?? 0);
      case "sellPriceAsc":
        return (a.sellPrice ?? 0) - (b.sellPrice ?? 0);
      case "sellPriceDesc":
        return (b.sellPrice ?? 0) - (a.sellPrice ?? 0);
      default:
        return 0;
    }
  });

  return (
    <main
      className="bg-primary px-6 md:px-[200px] pt-10 pb-4 overflow-y-auto"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto px-4">
        <FilterSelect />

        <div className="flex justify-center md:justify-center mb-10">
          <AveragesCard
            averageBuyPrice={data[0].averageBuyPrice ?? 0}
            averageSellPrice={data[0].averageSellPrice ?? 0}
          />
        </div>

        <div className="flex flex-wrap justify-center md:justify-center gap-6">
          {sortedData.map((item, index) => (
            <Link key={index} href={item.source} target="_blank">
              <QuoteCard
                buyPrice={item.buyPrice ?? 0}
                sellPrice={item.sellPrice ?? 0}
                displayName={item.displayName}
                buyPriceSlippage={item.buyPriceSlippage ?? 0}
                sellPriceSlippage={item.sellPriceSlippage ?? 0}
                updatedAt={item.updatedAt}
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
