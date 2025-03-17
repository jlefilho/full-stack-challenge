import { Slippage } from "../../../../core/interfaces/Slippage";

export class SlippageService {
  async listAll(): Promise<Slippage[] | null> {
    return [
      { source: "Nubank", sell_price_slippage: 0.0, buy_price_slippage: -0.06 },
      { source: "Wise", sell_price_slippage: -0.04, buy_price_slippage: -0.06 },
      { source: "Nomad", sell_price_slippage: 0.06, buy_price_slippage: 0.08 },
    ] as Slippage[];
  }
}
