import { PriceInfo } from "./price-info";

interface AverageCardProps {
  averageBuyPrice: number;
  averageSellPrice: number;
}

export function AveragesCard({
  averageBuyPrice,
  averageSellPrice,
}: AverageCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg px-8 py-4 flex flex-col justify-center gap-3 border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out max-h-[250px]">
      <div className="flex items-center">
        <h3
          className="text-xl font-semibold"
          style={{ color: "var(--text-dark)" }}
        >
          Média das Cotações
        </h3>
      </div>

      <PriceInfo type="buy" price={averageBuyPrice} />
      <PriceInfo type="sell" price={averageSellPrice} />
    </div>
  );
}
