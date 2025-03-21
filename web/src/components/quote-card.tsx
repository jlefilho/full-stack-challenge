import { LastUpdated } from "./last-updated";
import { PriceInfo } from "./price-info";

interface QuoteCardProps {
  displayName: string;
  buyPrice: number;
  sellPrice: number;
  buyPriceSlippage: number;
  sellPriceSlippage: number;
  updatedAt: string;
}

export function QuoteCard({
  displayName,
  buyPrice,
  sellPrice,
  buyPriceSlippage,
  sellPriceSlippage,
  updatedAt,
}: QuoteCardProps) {
  return (
    <div
      className="bg-white shadow-lg rounded-lg px-6 py-4 flex flex-col justify-between gap-4 border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      style={{
        borderLeft: "4px solid var(--orange-low)",
      }}
    >
      <div className="flex items-center justify-between">
        <h3
          className="text-lg sm:text-xl font-semibold"
          style={{ color: "var(--text-dark)" }}
        >
          {displayName}
        </h3>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <PriceInfo type="buy" price={buyPrice} slippage={buyPriceSlippage} />
        <PriceInfo type="sell" price={sellPrice} slippage={sellPriceSlippage} />

        <LastUpdated updatedAt={updatedAt} />
      </div>
    </div>
  );
}
