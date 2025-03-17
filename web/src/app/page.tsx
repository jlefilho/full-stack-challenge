import { Card } from "@/components/card";

const quotesMock = [
  { source: "Nubank", sell_price: 144, buy_price: 140.3 },
  { source: "Wise", sell_price: 143, buy_price: 140.8 },
  { source: "Nomad", sell_price: 145, buy_price: 141.3 },
];

const averageMock = {
  average_sell_price: 144,
  average_buy_price: 140.9,
};

const slippageMock = [
  { source: "Nubank", sell_price_slippage: 0.0, buy_price_slippage: -0.06 },
  { source: "Wise", sell_price_slippage: -0.04, buy_price_slippage: -0.06 },
  { source: "Nomad", sell_price_slippage: 0.06, buy_price_slippage: 0.08 },
];

function combineData(quotes: any[], average: any, slippage: any[]) {
  return quotes.map((quote) => {
    const slippageData = slippage.find((s) => s.source === quote.source);

    return {
      source: quote.source,
      buyPrice: quote.buy_price,
      sellPrice: quote.sell_price,
      averageBuyPrice: average.average_buy_price,
      averageSellPrice: average.average_sell_price,
      buyPriceSlippage: slippageData ? slippageData.buy_price_slippage : 0,
      sellPriceSlippage: slippageData ? slippageData.sell_price_slippage : 0,
    };
  });
}

const combinedData = combineData(quotesMock, averageMock, slippageMock);

export default function Home() {
  return (
    <main
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {combinedData.map((data, index) => (
        <Card
          key={index}
          buyPrice={data.buyPrice}
          sellPrice={data.sellPrice}
          source={data.source}
          buyPriceSlippage={data.buyPriceSlippage}
          sellPriceSlippage={data.sellPriceSlippage}
        />
      ))}
    </main>
  );
}
