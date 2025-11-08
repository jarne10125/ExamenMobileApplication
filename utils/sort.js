export const SORTS = {
  TITLE_ASC:  { key: 'TITLE_ASC',  label: 'Title ↑' },
  TITLE_DESC: { key: 'TITLE_DESC', label: 'Title ↓' },
  PRICE_ASC:  { key: 'PRICE_ASC',  label: 'Price ↑' },
  PRICE_DESC: { key: 'PRICE_DESC', label: 'Price ↓' },
};

export function sortProducts(products, sortKey) {
  const arr = [...products];
  switch (sortKey) {
    case SORTS.TITLE_ASC.key:  return arr.sort((a,b)=> a.title.localeCompare(b.title));
    case SORTS.TITLE_DESC.key: return arr.sort((a,b)=> b.title.localeCompare(a.title));
    case SORTS.PRICE_ASC.key:  return arr.sort((a,b)=> a.price - b.price);
    case SORTS.PRICE_DESC.key: return arr.sort((a,b)=> b.price - a.price);
    default: return arr;
  }
}
