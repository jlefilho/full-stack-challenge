import React, { createContext, useState, ReactNode, useContext } from "react";

interface CurrencyContextType {
  isUSDToBRL: boolean;
  toggleCurrency: () => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [isUSDToBRL, setIsUSDToBRL] = useState(true);

  const toggleCurrency = () => {
    setIsUSDToBRL((prevState) => !prevState);
  };

  return (
    <CurrencyContext.Provider value={{ isUSDToBRL, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
