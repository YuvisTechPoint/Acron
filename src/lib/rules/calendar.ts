/* counsel to verify */
/**
 * Authoritative Judicial & Gazetted Calendar Engine for POSH Timelines
 * References: PRD Sections 8.16.2 & 8.16.3, Limitation Act 1963 Section 4
 *
 * Supports High Court of Calcutta vacation calendar, West Bengal gazetted holidays,
 * working-day calculations, clock-stop grounds, and court-reopening rollover rules.
 */

export interface HolidayEntry {
  date: string; // YYYY-MM-DD
  name: string;
  type: "gazetted" | "restricted" | "high_court_vacation" | "emergency_closure";
  jurisdiction: "WEST_BENGAL" | "CALCUTTA_HIGH_COURT" | "NATIONAL";
  courtClosed: boolean;
}

/* counsel to verify */
export const WEST_BENGAL_AND_CALCUTTA_HC_CALENDAR_2026: HolidayEntry[] = [
  // National & State Gazetted Holidays 2026
  { date: "2026-01-23", name: "Netaji Jayanti", type: "gazetted", jurisdiction: "WEST_BENGAL", courtClosed: true },
  { date: "2026-01-26", name: "Republic Day", type: "gazetted", jurisdiction: "NATIONAL", courtClosed: true },
  { date: "2026-02-02", name: "Saraswati Puja / Vasant Panchami", type: "gazetted", jurisdiction: "WEST_BENGAL", courtClosed: true },
  { date: "2026-03-03", name: "Doljatra", type: "gazetted", jurisdiction: "WEST_BENGAL", courtClosed: true },
  { date: "2026-03-04", name: "Holi", type: "gazetted", jurisdiction: "NATIONAL", courtClosed: true },
  { date: "2026-03-21", name: "Eid-ul-Fitr", type: "gazetted", jurisdiction: "NATIONAL", courtClosed: true },
  { date: "2026-04-03", name: "Good Friday", type: "gazetted", jurisdiction: "NATIONAL", courtClosed: true },
  { date: "2026-04-14", name: "Dr. B.R. Ambedkar Jayanti / Bengali New Year", type: "gazetted", jurisdiction: "WEST_BENGAL", courtClosed: true },
  { date: "2026-05-01", name: "May Day", type: "gazetted", jurisdiction: "WEST_BENGAL", courtClosed: true },
  { date: "2026-05-09", name: "Rabindra Jayanti", type: "gazetted", jurisdiction: "WEST_BENGAL", courtClosed: true },
  { date: "2026-05-27", name: "Bakrid / Eid-ul-Adha", type: "gazetted", jurisdiction: "NATIONAL", courtClosed: true },
  { date: "2026-06-26", name: "Muharram", type: "gazetted", jurisdiction: "NATIONAL", courtClosed: true },
  { date: "2026-08-15", name: "Independence Day", type: "gazetted", jurisdiction: "NATIONAL", courtClosed: true },
  { date: "2026-09-04", name: "Janmashtami", type: "gazetted", jurisdiction: "WEST_BENGAL", courtClosed: true },
  { date: "2026-10-02", name: "Mahatma Gandhi Jayanti", type: "gazetted", jurisdiction: "NATIONAL", courtClosed: true },
  { date: "2026-10-18", name: "Maha Saptami", type: "gazetted", jurisdiction: "WEST_BENGAL", courtClosed: true },
  { date: "2026-10-19", name: "Maha Ashtami", type: "gazetted", jurisdiction: "WEST_BENGAL", courtClosed: true },
  { date: "2026-10-20", name: "Maha Nabami / Vijaya Dashami", type: "gazetted", jurisdiction: "WEST_BENGAL", courtClosed: true },
  { date: "2026-10-25", name: "Lakshmi Puja", type: "gazetted", jurisdiction: "WEST_BENGAL", courtClosed: true },
  { date: "2026-11-08", name: "Kali Puja / Diwali", type: "gazetted", jurisdiction: "NATIONAL", courtClosed: true },
  { date: "2026-11-24", name: "Guru Nanak Jayanti", type: "gazetted", jurisdiction: "NATIONAL", courtClosed: true },
  { date: "2026-12-25", name: "Christmas Day", type: "gazetted", jurisdiction: "NATIONAL", courtClosed: true },

  // Calcutta High Court Official Vacations 2026
  // Summer Vacation: Late May through mid-June
  { date: "2026-05-25", name: "Calcutta High Court Summer Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  { date: "2026-05-26", name: "Calcutta High Court Summer Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  { date: "2026-05-28", name: "Calcutta High Court Summer Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  { date: "2026-05-29", name: "Calcutta High Court Summer Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  // Autumn / Puja Vacation
  { date: "2026-10-12", name: "High Court Autumn / Puja Vacation Start", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  { date: "2026-10-13", name: "High Court Autumn / Puja Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  { date: "2026-10-14", name: "High Court Autumn / Puja Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  { date: "2026-10-15", name: "High Court Autumn / Puja Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  { date: "2026-10-16", name: "High Court Autumn / Puja Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  { date: "2026-10-21", name: "High Court Autumn / Puja Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  { date: "2026-10-22", name: "High Court Autumn / Puja Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  { date: "2026-10-23", name: "High Court Autumn / Puja Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  // Winter Vacation: Dec 26 - Dec 31
  { date: "2026-12-28", name: "High Court Winter Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  { date: "2026-12-29", name: "High Court Winter Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  { date: "2026-12-30", name: "High Court Winter Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
  { date: "2026-12-31", name: "High Court Winter Vacation", type: "high_court_vacation", jurisdiction: "CALCUTTA_HIGH_COURT", courtClosed: true },
];

/* counsel to verify */
/**
 * Checks whether a given calendar date is a non-working day (Saturday, Sunday, or gazetted/court holiday)
 */
export function isNonWorkingDay(date: Date | string): boolean {
  const d = new Date(date);
  const day = d.getDay(); // 0 is Sunday, 6 is Saturday
  if (day === 0 || day === 6) return true;

  const iso = d.toISOString().split("T")[0];
  return WEST_BENGAL_AND_CALCUTTA_HC_CALENDAR_2026.some(
    (h) => h.date === iso && h.courtClosed
  );
}

/* counsel to verify */
/**
 * Adds N working days to a base date, skipping weekends and declared holidays.
 */
export function addWorkingDays(startDate: Date | string, days: number): Date {
  const current = new Date(startDate);
  let added = 0;

  while (added < days) {
    current.setDate(current.getDate() + 1);
    if (!isNonWorkingDay(current)) {
      added++;
    }
  }

  return current;
}

/* counsel to verify */
/**
 * Implements Section 4 of the Limitation Act 1963:
 * If a statutory limitation deadline expires on a day when the forum/court/office is closed,
 * the deadline rolls forward to the next business day on which it reopens.
 */
export function applySection4ClosureRollover(deadline: Date | string): {
  originalDeadline: Date;
  effectiveDeadline: Date;
  rolledForward: boolean;
  closureReason?: string;
} {
  const original = new Date(deadline);
  let effective = new Date(deadline);
  let rolled = false;
  let reason: string | undefined;

  while (isNonWorkingDay(effective)) {
    rolled = true;
    const iso = effective.toISOString().split("T")[0];
    const holiday = WEST_BENGAL_AND_CALCUTTA_HC_CALENDAR_2026.find((h) => h.date === iso);
    const day = effective.getDay();
    if (!reason) {
      if (holiday) {
        reason = `${holiday.name} (${holiday.type})`;
      } else if (day === 0) {
        reason = "Sunday Statutory Judicial Closure";
      } else if (day === 6) {
        reason = "Saturday Judicial Closure";
      }
    }
    effective.setDate(effective.getDate() + 1);
  }

  return {
    originalDeadline: original,
    effectiveDeadline: effective,
    rolledForward: rolled,
    closureReason: reason,
  };
}
