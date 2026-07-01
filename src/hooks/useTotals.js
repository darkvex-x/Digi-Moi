import { useMemo } from 'react';

/**
 * useTotals
 * Aggregates collection values, counts events/entries, and calculates daily collections.
 * Accepts arrays of events and entries, and outputs statistics for rendering.
 */
export function useTotals(events = [], entries = []) {
  return useMemo(() => {
    const totalEvents = events.length;
    const totalEntries = events.reduce((sum, e) => sum + (e.totalEntries || 0), 0);
    const totalCollection = events.reduce((sum, e) => sum + (e.totalAmount || 0), 0);

    const todayStr = new Date().toISOString().split('T')[0];
    const todaysCollection = entries
      .filter(entry => entry.date === todayStr)
      .reduce((sum, entry) => sum + (entry.amount || 0), 0);

    return {
      totalEvents,
      totalEntries,
      totalCollection,
      todaysCollection
    };
  }, [events, entries]);
}
