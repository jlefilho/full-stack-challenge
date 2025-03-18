import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

interface PriceInfoProps {
  type: "buy" | "sell";
  price: number;
  slippage: number;
  isUSDToBRL: boolean;
}

export function PriceInfo({
  type,
  price,
  slippage,
  isUSDToBRL,
}: PriceInfoProps) {
  const priceToShow = isUSDToBRL ? price : 1 / price;
  const slippageToShow = isUSDToBRL ? slippage : -slippage;

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {type === "buy" ? <FaArrowAltCircleDown /> : <FaArrowAltCircleUp />}
        <span>{type === "buy" ? "Compra" : "Venda"}</span>
      </div>
      <div
        className={`flex-1 text-right ${
          slippageToShow === 0
            ? "text-gray-500"
            : slippageToShow < 0
            ? "text-green-600"
            : "text-red-600"
        } font-semibold`}
      >
        <span
          className="text-xs font-normal"
          style={{ color: "var(--text-dark)" }}
        >
          {isUSDToBRL ? "$1 USD = " : "R$ 1 BRL = "}
        </span>
        <span
          className={`font-bold ${
            slippageToShow === 0
              ? "text-gray-800"
              : slippageToShow < 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {isUSDToBRL
            ? `R$${priceToShow.toFixed(3)}`
            : `$${priceToShow.toFixed(3)}`}
        </span>
        <span className="text-xs">({slippageToShow.toFixed(3)}%)</span>
      </div>
    </div>
  );
}
