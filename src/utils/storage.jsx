export const loadTableData = (table) => {
  const key = `table_${table}`;
  return {
    cart: window[`cart_${key}`] || {},
    history: window[`history_${key}`] || []
  };
};

export const saveTableData = (table, cart, history) => {
  const key = `table_${table}`;
  window[`cart_${key}`] = cart;
  window[`history_${key}`] = history;
};
