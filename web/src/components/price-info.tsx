import { useCurrency } from "@/contexts/currency-context";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

interface PriceInfoProps {
  type: "buy" | "sell";
  price: number;
  slippage: number;
}

export function PriceInfo({ type, price, slippage }: PriceInfoProps) {
  const { isUSDToBRL } = useCurrency();

  const priceToShow = isUSDToBRL ? price : 1 / price;
  const slippageToShow = isUSDToBRL ? slippage : -slippage;

  const priceColorClass =
    slippageToShow > 0 ? "text-green-600" : "text-red-600";

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {type === "buy" ? <FaArrowAltCircleDown /> : <FaArrowAltCircleUp />}
        <span>{type === "buy" ? "Compra" : "Venda"}</span>
      </div>
      <div className={`flex-1 text-right ${priceColorClass} font-semibold`}>
        <span
          className="text-xs font-normal"
          style={{ color: "var(--text-dark)" }}
        >
          {isUSDToBRL ? "1 USD = " : "1 BRL = "}
        </span>
        <span className={`font-bold ${priceColorClass}`}>
          {isUSDToBRL
            ? `R$${priceToShow.toFixed(3)}`
            : `$${priceToShow.toFixed(3)}`}{" "}
        </span>
        <span className="text-xs">({slippageToShow.toFixed(3)}%)</span>
      </div>
    </div>
  );
}
