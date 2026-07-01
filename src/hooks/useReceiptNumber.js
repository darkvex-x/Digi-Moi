import { useMemo } from 'react';

/**
 * useReceiptNumber
 * Computes the next receipt number sequentially for the current event entries.
 */
export function useReceiptNumber(entries = [], prefix = 'MR-') {
  return useMemo(() => {
    if (!entries.length) return `${prefix}001`;
    const maxNumber = entries.reduce((max, entry) => {
      const num = parseInt(entry.receiptNumber, 10);
      return (num && !isNaN(num) && num > max) ? num : max;
    }, 0);
    const nextNum = maxNumber + 1;
    const formattedNum = String(nextNum).padStart(3, '0');
    return `${prefix}${formattedNum}`;
  }, [entries, prefix]);
}
