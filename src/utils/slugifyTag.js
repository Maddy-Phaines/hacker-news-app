// src/utils/slugifyTag.js
export default function slugifyTag(urlTag) {
  switch (urlTag) {
    case "ask":
      return "ask_hn";
    case "show":
      return "show_hn";
    case "polls":
      return "poll";
    default:
      return urlTag; // "best" or undefined → "front_page"
  }
}
