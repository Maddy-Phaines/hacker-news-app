export async function fetchSuggestions(query) {
  const url = new URL("https://hn.algolia.com/api/v1/search_by_date");
  url.searchParams.set("query", query);
  url.searchParams.set("hitsPerPage", 5);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");

  const { hits } = await res.json();
  return hits.map((h) => h.title).filter(Boolean);
}
