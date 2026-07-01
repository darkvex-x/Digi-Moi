import { useMemo } from 'react';

/**
 * useSearch
 * Filters arrays of items based on query matches on defined keys,
 * formatting receipt keys correctly during search.
 */
export function useSearch(items = [], searchQuery = '', keys = [], receiptPrefix = '') {
  return useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (!trimmedQuery) return items;

    return items.filter(item => {
      return keys.some(key => {
        if (key === 'receiptNumber' && item.receiptNumber) {
          const fullReceipt = `${receiptPrefix}${item.receiptNumber}`.toLowerCase();
          return fullReceipt.includes(trimmedQuery);
        }

        const value = item[key];
        if (value === undefined || value === null) return false;
        return String(value).toLowerCase().includes(trimmedQuery);
      });
    });
  }, [items, searchQuery, keys, receiptPrefix]);
}
