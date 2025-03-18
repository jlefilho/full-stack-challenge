import { FaExchangeAlt } from "react-icons/fa";
import Flag from "react-world-flags";

interface CurrencyToggleProps {
  isUSDToBRL: boolean;
  onToggle: (newState: boolean) => void;
}

export function CurrencyToggle({ isUSDToBRL, onToggle }: CurrencyToggleProps) {
  return (
    <div
      className="flex items-center justify-center gap-2 bg-white p-2 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out"
      style={{ maxWidth: "200px", cursor: "pointer" }}
      onClick={() => onToggle(!isUSDToBRL)}
    >
      <div className="flex items-center gap-2">
        <Flag
          code={isUSDToBRL ? "US" : "BR"}
          style={{ width: "20px", height: "15px" }}
        />
        <span className="font-semibold text-sm">
          {isUSDToBRL ? "USD" : "BRL"}{" "}
        </span>
      </div>

      <FaExchangeAlt size={16} className="text-gray-500" />

      <div className="flex items-center gap-2">
        <Flag
          code={isUSDToBRL ? "BR" : "US"}
          style={{ width: "20px", height: "15px" }}
        />
        <span className="font-semibold text-sm">
          {isUSDToBRL ? "BRL" : "USD"}{" "}
        </span>
      </div>
    </div>
  );
}
