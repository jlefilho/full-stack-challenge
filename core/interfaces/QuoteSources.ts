export enum QUOTE_SOURCE {
  Nubank = "Nubank",
  Wise = "Wise",
  Nomad = "Nomad",
}

export const QuoteSourceMapping = {
  [QUOTE_SOURCE.Nubank]: {
    display_name: QUOTE_SOURCE.Nubank,
    source: "https://www.nubank.com.br/dados-abertos/taxas-conversao",
  },
  [QUOTE_SOURCE.Wise]: {
    display_name: QUOTE_SOURCE.Wise,
    source: "https://wise.com/br/currency-converter/brl-to-usd-rate",
  },
  [QUOTE_SOURCE.Nomad]: {
    display_name: QUOTE_SOURCE.Nomad,
    source: "https://www.nomadglobal.com/cotacoes/dolar",
  },
};
