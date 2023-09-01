export const CoinList = (currency) =>
  `${import.meta.env.VITE_BASE_API_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin= (id) =>
  `${import.meta.env.VITE_BASE_API_URL}/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `${import.meta.env.VITE_BASE_API_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `${import.meta.env.VITE_BASE_API_URL}/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;
