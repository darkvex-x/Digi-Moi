import { useState } from 'react';

/**
 * usePrint
 * Exposes print target states and toggles.
 */
export function usePrint() {
  const [printTarget, setPrintTarget] = useState(null);

  const handlePrint = (target) => {
    setPrintTarget(target);
  };

  const handleClosePrint = () => {
    setPrintTarget(null);
  };

  return {
    printTarget,
    isPrintOpen: !!printTarget,
    handlePrint,
    handleClosePrint
  };
}
