import { FaSync } from "react-icons/fa";
import { formatIsoDateToReadable } from "@/utils/formatDate";

interface LastUpdatedProps {
  updatedAt: string;
}

export function LastUpdated({ updatedAt }: LastUpdatedProps) {
  const formattedDate = formatIsoDateToReadable(updatedAt);

  return (
    <div className="flex justify-between items-center mt-6">
      <div className="flex items-center gap-2">
        <FaSync className="text-gray-400" size={10} />
        <span className="text-xs text-gray-400">Última atualização:</span>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
    </div>
  );
}
