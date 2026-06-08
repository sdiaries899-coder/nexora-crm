/**
 * @desc Format Date (DD MMM YYYY)
 */
export const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * @desc Truncate Text
 */
export const truncate = (text, length = 50) => {
  if (!text) return "";
  return text.length > length
    ? text.substring(0, length) + "..."
    : text;
};

/**
 * @desc Copy to Clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};