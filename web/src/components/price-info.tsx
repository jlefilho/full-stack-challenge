import { formatNumberToBRL } from "@/utils/formatNumber";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

interface PriceInfoProps {
  type: "buy" | "sell";
  price: number;
  slippage?: number;
}

export function PriceInfo({ type, price, slippage }: PriceInfoProps) {
  const priceColorClass =
    slippage && slippage > 0 ? "text-green-600" : "text-red-600";

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <div className="flex items-center gap-2">
        {type === "buy" ? <FaArrowAltCircleDown /> : <FaArrowAltCircleUp />}
        <span>{type === "buy" ? "Compra" : "Venda"}</span>
      </div>
      <div
        className={`flex-1 mt-2 sm:mt-0 ml-4 text-right ${
          slippage ? priceColorClass : ""
        } font-semibold`}
      >
        <span
          className="text-xs font-normal mr-1"
          style={{ color: "var(--text-dark)" }}
        >
          1 USD =
        </span>
        <span className={`font-bold ${slippage ? priceColorClass : ""}`}>
          R${formatNumberToBRL(price)}
        </span>
        {slippage && (
          <span className="text-xs ml-1">({slippage.toFixed(3)}%)</span>
        )}
      </div>
    </div>
  );
}
