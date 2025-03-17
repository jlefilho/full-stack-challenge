import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

interface AverageCardProps {
  averageBuyPrice: number;
  averageSellPrice: number;
}

export function AveragesCard({
  averageBuyPrice,
  averageSellPrice,
}: AverageCardProps) {
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
        {/* Linha de Compra com ícone */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaArrowAltCircleDown />
            <span>Compra</span>
          </div>
          <div className="text-right font-semibold">
            R${averageBuyPrice.toFixed(2)}
          </div>
        </div>

        {/* Linha de Venda com ícone */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaArrowAltCircleUp />
            <span>Venda</span>
          </div>
          <div className="text-right font-semibold">
            R${averageSellPrice.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
