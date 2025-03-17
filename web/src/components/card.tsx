interface CardProps {
  source: string;
  buyPrice: number;
  sellPrice: number;
  buyPriceSlippage: number;
  sellPriceSlippage: number;
}

export function Card({
  source,
  buyPrice,
  sellPrice,
  buyPriceSlippage,
  sellPriceSlippage,
}: CardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg px-8 py-4 flex flex-col justify-center gap-3 border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out min-w-sm mx-auto h-[250px]">
      <div className="flex items-center">
        <h3 className="text-xl font-semibold text-gray-800">{source}</h3>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <span className="text-sm text-gray-500">BRL/USD</span>

        <div className="flex justify-between items-center">
          <div className="flex-1 text-gray-600">Compra</div>
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

        <div className="flex justify-between items-center mt-4">
          <div className="flex-1 text-gray-600">Venda</div>
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
          <span className="text-xs text-gray-400">Atualizado em:</span>
          <span className="text-xs text-gray-500">10:00 AM</span>
        </div>
      </div>
    </div>
  );
}
