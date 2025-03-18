import { LastUpdated } from "./last-updated";
import { PriceInfo } from "./price-info";

interface QuoteCardProps {
  source: string;
  buyPrice: number;
  sellPrice: number;
  buyPriceSlippage: number;
  sellPriceSlippage: number;
  updatedAt: string;
  isUSDToBRL: boolean;
}

export function QuoteCard({
  source,
  buyPrice,
  sellPrice,
  buyPriceSlippage,
  sellPriceSlippage,
  updatedAt,
  isUSDToBRL,
}: QuoteCardProps) {
  return (
    <div
      className="bg-white shadow-lg rounded-lg px-8 py-4 flex flex-col justify-center gap-3 border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out max-h-[250px]"
      style={{
        borderLeft: "4px solid var(--orange-low)",
      }}
    >
      <div className="flex items-center">
        <h3
          className="text-xl font-semibold"
          style={{ color: "var(--text-dark)" }}
        >
          {source}
        </h3>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <span className="text-sm text-gray-400">
          {isUSDToBRL ? "USD/BRL" : "BRL/USD"}
        </span>

        <PriceInfo
          type="buy"
          price={buyPrice}
          slippage={buyPriceSlippage}
          isUSDToBRL={isUSDToBRL}
        />
        <PriceInfo
          type="sell"
          price={sellPrice}
          slippage={sellPriceSlippage}
          isUSDToBRL={isUSDToBRL}
        />

        <LastUpdated updatedAt={updatedAt} />
      </div>
    </div>
  );
}
