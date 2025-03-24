"use client";

import { createContext, useContext, useState } from "react";

type SortOption =
  | "alphabetical"
  | "buyPriceAsc"
  | "buyPriceDesc"
  | "sellPriceAsc"
  | "sellPriceDesc";

interface FilterContextProps {
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [sortOption, setSortOption] = useState<SortOption>("alphabetical");

  return (
    <FilterContext.Provider value={{ sortOption, setSortOption }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
