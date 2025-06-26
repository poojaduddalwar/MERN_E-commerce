import axios from "axios";

export const fetchAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "ORDERS_ADMIN_REQUEST" });
    const { data } = await axios.get("/api/v1/order/all");
    dispatch({ type: "ORDERS_ADMIN_SUCCESS", payload: data.orders });
  } catch (error) {
    dispatch({ type: "ORDERS_ADMIN_FAIL", payload: error.response?.data?.message || error.message });
  }
};

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    await axios.patch(`/api/v1/order/${orderId}/status`, { status });
    dispatch(fetchAllOrders()); // refresh list
  } catch (error) {
    console.error("Status update failed:", error.message);
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/order/${orderId}`);
    dispatch(fetchAllOrders());
  } catch (error) {
    console.error("Order deletion failed:", error.message);
  }
};
