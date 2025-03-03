export const capitalizeString = str => {
  if (!str) return str; // Return the original string if it's empty or null
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
