export function extractDomain(url) {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    return domain;
  } catch {
    return "news.ycombinator.com";
  }
}
