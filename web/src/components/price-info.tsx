import { useCurrency } from "@/contexts/currency-context";
import { formatNumberToBRL } from "@/utils/formatNumber";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

interface PriceInfoProps {
  type: "buy" | "sell";
  price: number;
  slippage?: number;
}

export function PriceInfo({ type, price, slippage }: PriceInfoProps) {
  const { isUSDToBRL } = useCurrency();

  let priceToShow = 0;
  let slippageToShow = 0;

  if (price) {
    priceToShow = isUSDToBRL ? price : 1 / price;
  }

  if (slippage) {
    slippageToShow = isUSDToBRL ? slippage : -slippage;
  }

  const priceColorClass =
    slippageToShow > 0 ? "text-green-600" : "text-red-600";

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {type === "buy" ? <FaArrowAltCircleDown /> : <FaArrowAltCircleUp />}
        <span>{type === "buy" ? "Compra" : "Venda"}</span>
      </div>
      <div
        className={`flex-1 ml-4 text-right ${
          slippage ? priceColorClass : ""
        } font-semibold`}
      >
        <span
          className="text-xs font-normal"
          style={{ color: "var(--text-dark)" }}
        >
          {isUSDToBRL ? "1 USD = " : "1 BRL = "}
        </span>
        <span className={`font-bold ${slippage ? priceColorClass : ""}`}>
          {isUSDToBRL
            ? `R$${formatNumberToBRL(priceToShow)}`
            : `$${priceToShow.toFixed(3)}`}{" "}
        </span>
        {slippage && (
          <span className="text-xs">({slippageToShow.toFixed(3)}%)</span>
        )}
      </div>
    </div>
  );
}
