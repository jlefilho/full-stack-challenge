import { formatIsoDateToReadable } from "@/utils/formatDate";
import {
  FaArrowAltCircleDown,
  FaSync,
  FaArrowAltCircleUp,
} from "react-icons/fa";

interface AverageCardProps {
  averageBuyPrice: number;
  averageSellPrice: number;
  updatedAt: string;
  isUSDToBRL: boolean;
}

export function AveragesCard({
  averageBuyPrice,
  averageSellPrice,
  updatedAt,
  isUSDToBRL,
}: AverageCardProps) {
  const buyPriceToShow = isUSDToBRL ? averageBuyPrice : 1 / averageBuyPrice;
  const sellPriceToShow = isUSDToBRL ? averageSellPrice : 1 / averageSellPrice;

  const formattedDate = formatIsoDateToReadable(updatedAt);

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
          Média das Cotações
        </h3>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaArrowAltCircleDown />
            <span>Compra</span>
          </div>
          <div className="text-right font-semibold">
            {isUSDToBRL ? "R$" : "$"} {buyPriceToShow.toFixed(2)}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaArrowAltCircleUp />
            <span>Venda</span>
          </div>
          <div className="text-right font-semibold">
            {isUSDToBRL ? "R$" : "$"} {sellPriceToShow.toFixed(2)}
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
    </div>
  );
}
