export type Order = {
  orderID: number;
  cid: number;
  baseCurrency: "BTC";
  quoteCurrency: "EUR";
  type: "MARKET" | "LIMIT";
  side: "BUY" | "SELL";
  volume: number;
  rate: number;
  amount: number;
  brokerage: number;
  pendingVolume: number;
  orderStatus: boolean;
  orderPlacementDate: string;
  orderConfirmDate: string;
  isProOrder: boolean;
  trades: Trade[];
  brokerages: null;
  status: "FILLED" | "PARTIALLY_FILLED";
};

type Trade = {
  id: number;
  orderID: number;
  baseCurrency: "BTC";
  quoteCurrency: "EUR";
  side: "BUY";
  taker: boolean;
  amount: number;
  volume: number;
  rate: number;
  brokerage: number;
  brokerageCurrency: "BTC";
  executionDate: string;
};
