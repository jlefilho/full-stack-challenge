import { FaSync } from "react-icons/fa";

interface QuoteCardProps {
  source: string;
  buyPrice: number;
  sellPrice: number;
  buyPriceSlippage: number;
  sellPriceSlippage: number;
  updatedAt: string;
}

export function QuoteCard({
  source,
  buyPrice,
  sellPrice,
  buyPriceSlippage,
  sellPriceSlippage,
  updatedAt,
}: QuoteCardProps) {
  const formattedDate = formatIsoDateToReadable(updatedAt);

  function formatIsoDateToReadable(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

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
        <span className="text-sm text-gray-400">BRL/USD</span>

        <div className="flex justify-between">
          <div className="flex-1">Compra</div>
          <div className="flex-1 text-right text-green-500 font-semibold">
            R${buyPrice.toFixed(2)}{" "}
            <span
              className={`text-xs ${
                buyPriceSlippage < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              ({buyPriceSlippage}%)
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex-1" style={{ color: "var(--text-dark)" }}>
            Venda
          </div>
          <div className="flex-1 text-right text-red-500 font-semibold">
            R${sellPrice.toFixed(2)}{" "}
            <span
              className={`text-xs ${
                sellPriceSlippage < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              ({sellPriceSlippage}%)
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-2">
          <FaSync className="text-gray-400 cursor-pointer" size={10} />
          <span className="text-xs text-gray-400">Última atualização:</span>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
