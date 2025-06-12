const DEFAULT_DOMAIN = "www.ycombinator.news.com";

export const extractDomain = (urlString) => {
  if (!urlString) return DEFAULT_DOMAIN;

  try {
    const urlObj = new URL(urlString);
    const hostName = urlObj.hostname.replace("www.", "");
    return hostName;
  } catch {
    return DEFAULT_DOMAIN;
  }
};
