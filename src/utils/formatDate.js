import { formatDistanceToNow } from "date-fns";

/**
 * Safely formats a date string into a relative time format (e.g., "3 days ago").
 *
 * Handles missing or invalid date inputs gracefully by returning "Unknown date"
 * instead of throwing errors.
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} - Formatted relative time string or "Unknown date" fallback.
 */
export function formatDateSafe(dateString) {
  // Check if date string is missing, null, or empty
  if (!dateString) {
    return "Unknown date";
  }

  // Parse date string and validate date object
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Unknown date";
  }

  // Format valid date as "x time ago"
  return formatDistanceToNow(date, { addSuffix: true });
}
