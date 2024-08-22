export const setLocalStorage = (key, value) => {
  // Convert value to JSON string if it's an object
  const valueToStore =
    typeof value === "object" ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);

  try {
    // Try to parse JSON; if it fails, return the string as is
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
