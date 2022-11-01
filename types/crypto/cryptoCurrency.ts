export type CryptoCurrency = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  last_updated: Date;
  date_added: Date;
  tags: string[];
  platform?: any;
  self_reported_circulating_supply?: any;
  self_reported_market_cap?: any;
  quote: any;
};
