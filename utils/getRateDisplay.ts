// utils/getRateDisplay.ts
const getRateDisplay = (property: { rates: { weekly?: number; monthly?: number; nightly?: number } }) => {
  const { weekly, monthly, nightly } = property.rates;
  if (monthly) return `$${monthly.toLocaleString()}/mo`;
  if (weekly) return `$${weekly.toLocaleString()}/wk`;
  if (nightly) return `$${nightly.toLocaleString()}/night`;
  return ''; // optional fallback
};
export default getRateDisplay;