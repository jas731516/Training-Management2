// Helper for localStorage with default data
export const getData = (key, defaultData) => {
  const stored = localStorage.getItem(key);
  if (stored) return JSON.parse(stored);

  // If nothing in storage, initialize with default
  localStorage.setItem(key, JSON.stringify(defaultData));
  return defaultData;
};

export const setData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
