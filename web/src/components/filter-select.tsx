"use client";

import { useFilterContext } from "@/contexts/filter-context";
import * as Select from "@radix-ui/react-select";
import { FiFilter } from "react-icons/fi";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export function FilterSelect() {
  const { sortOption, setSortOption } = useFilterContext();

  return (
    <div className="flex justify-center mb-6 relative">
      <Select.Root value={sortOption} onValueChange={setSortOption}>
        <Select.Trigger
          className="border border-gray-200 bg-white shadow-lg rounded-lg px-4 py-2 text-sm font-medium text-[var(--text-dark)] 
                     flex items-center gap-2 transition-all duration-300 ease-in-out 
                     hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--orange-low)]"
        >
          <FiFilter className="text-gray-500" size={18} />
          <Select.Value />
          <Select.Icon className="text-gray-500">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Content
          className="bg-white border border-gray-200 shadow-lg rounded-lg mt-1"
          position="popper"
          align="center"
        >
          <Select.Viewport className="p-1">
            {[
              { value: "alphabetical", label: "Ordem Alfabética" },
              { value: "buyPriceAsc", label: "Menor Preço de Compra" },
              { value: "buyPriceDesc", label: "Maior Preço de Compra" },
              { value: "sellPriceAsc", label: "Menor Preço de Venda" },
              { value: "sellPriceDesc", label: "Maior Preço de Venda" },
            ].map(({ value, label }) => (
              <Select.Item
                key={value}
                value={value}
                className="px-4 py-2 text-sm text-[var(--text-dark)] rounded-md cursor-pointer 
                             hover:bg-[var(--orange-low)] focus:bg-[var(--orange-low)] focus:outline-none"
              >
                <Select.ItemText>{label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  );
}
