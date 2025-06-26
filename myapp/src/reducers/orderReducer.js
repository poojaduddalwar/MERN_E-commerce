export const orderAdminReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ORDERS_ADMIN_REQUEST":
      return { loading: true, orders: [] };
    case "ORDERS_ADMIN_SUCCESS":
      return { loading: false, orders: action.payload };
    case "ORDERS_ADMIN_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
