/* counsel to verify */
/**
 * Small-Cell Suppression for Privacy & Anonymity Preservation
 * Statutory References:
 * - POSH Act Section 16: Strict prohibition on publication or making known contents of complaint and inquiry proceedings.
 * - Minimum reporting cohort size of 5 prevents de-anonymization in low-incidence departments or locations.
 */

/* counsel to verify */
/**
 * Suppresses small numeric cells to prevent individual re-identification
 */
export function suppressSmallCell(count: number): string {
  if (count === 0) {
    return "0";
  }
  if (count > 0 && count < 5) {
    return "< 5";
  }
  return String(count);
}

/* counsel to verify */
/**
 * Suppresses metric fields across an object
 */
export function suppressObjectMetrics<T extends Record<string, any>>(
  data: T,
  numericKeys: (keyof T)[]
): Record<string, any> {
  const result: Record<string, any> = { ...data };
  for (const key of numericKeys) {
    const stringKey = String(key);
    const val = result[stringKey];
    if (typeof val === "number") {
      result[stringKey] = suppressSmallCell(val);
    }
  }
  return result;
}
