/**
 * Strip out all HTML tags and decode HTML entities.
 * @param {string} html
 * @returns {string}
 */
export function stripHtml(html) {
  // Parse the string into a real DOM
  const doc = new DOMParser().parseFromString(html || "", "text/html");
  // textContent gives you only the rendered text (no tags)
  return doc.body.textContent || "";
}
