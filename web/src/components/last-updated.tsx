import { FaSync } from "react-icons/fa";
import { formatIsoDateToReadable } from "@/utils/formatDate";

interface LastUpdatedProps {
  updatedAt: string;
}

export function LastUpdated({ updatedAt }: LastUpdatedProps) {
  const formattedDate = formatIsoDateToReadable(updatedAt);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mt-6">
      <div className="flex items-center gap-2">
        <FaSync className="text-gray-400" size={12} />
        <span className="text-xs text-gray-400">Última atualização:</span>
      </div>

      <span className="text-xs text-gray-500 mt-2 sm:mt-0">
        {formattedDate}
      </span>
    </div>
  );
}
