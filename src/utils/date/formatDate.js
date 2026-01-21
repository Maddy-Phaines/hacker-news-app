import { formatDistanceToNowStrict } from "date-fns";

/**
 * Safely formats a date string into a relative time format.
 *
 * If `short` is true, returns a compact format like "3h ago", "2d ago".
 * Otherwise returns "about 3 hours ago", etc.
 *
 * @param {string} dateString - The date string to format.
 * @param {Object} options - Optional settings
 * @param {boolean} options.short - If true, use compact format
 * @returns {string} - Relative time string
 */
export function formatDateSafe(dateString, { short = false } = {}) {
  // Check if date string is missing, null, or empty
  if (!dateString) return "Unknown date";

  // Parse date string and validate date object
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Unknown date";

  if (short) {
    const diff = formatDistanceToNowStrict(date);
    const [value, unit] = diff.split(" ");

    const abbrev = {
      second: "s",
      seconds: "s",
      minute: "m",
      minutes: "m",
      hour: "h",
      hours: "h",
      day: "d",
      days: "d",
      week: "w",
      weeks: "w",
      month: "mo",
      months: "mo",
      year: "y",
      years: "y",
    };

    return `${value}${abbrev[unit] || ""} ago`;
  }

  // Format valid date as "x time ago"
  return formatDistanceToNowStrict(date, { addSuffix: true });
}
