
export function stringToColor(name) {
  if (!name || typeof name !== "string") return "#000000"; // fallback

  const initials = getInitials(name);

  // simple hash function
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash = initials.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }
  return color;
}


export function getInitials(name) {
  if (!name || typeof name !== "string") return "";

  const words = name
    .trim()
    .split(/\s+/)       // split by spaces
    .filter(Boolean);   // remove empty strings

  if (words.length === 0) return "";
  if (words.length === 1) return words[0][0].toUpperCase();

  return (words[0][0] + words[1][0]).toUpperCase();
}