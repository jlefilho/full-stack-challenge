import { useCurrency } from "@/contexts/currency-context";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

interface AverageCardProps {
  averageBuyPrice: number;
  averageSellPrice: number;
}

export function AveragesCard({
  averageBuyPrice,
  averageSellPrice,
}: AverageCardProps) {
  const { isUSDToBRL } = useCurrency();

  const buyPriceToShow = isUSDToBRL ? averageBuyPrice : 1 / averageBuyPrice;
  const sellPriceToShow = isUSDToBRL ? averageSellPrice : 1 / averageSellPrice;

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

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaArrowAltCircleDown />
            <span>Compra</span>
          </div>
          <div className="text-right font-semibold">
            <span
              className="text-xs font-normal ml-8"
              style={{ color: "var(--text-dark)" }}
            >
              {isUSDToBRL ? "1 USD = " : "1 BRL = "}
            </span>
            <span>
              {isUSDToBRL ? "R$" : "$"} {buyPriceToShow.toFixed(3)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaArrowAltCircleUp />
            <span>Venda</span>
          </div>
          <div className="text-right font-semibold">
            <span
              className="text-xs font-normal ml-8"
              style={{ color: "var(--text-dark)" }}
            >
              {isUSDToBRL ? "1 USD = " : "1 BRL = "}
            </span>
            <span>
              {isUSDToBRL ? "R$" : "$"} {sellPriceToShow.toFixed(3)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
