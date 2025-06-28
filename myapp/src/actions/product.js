import toast from 'react-hot-toast'
import axios from 'axios'

export const addProduct = (name, price, listPrice, description, color, compatibleWith, category, imageUrl, stock) => async (dispatch, getState) => {
    try {
        const base_Url = process.env.REACT_APP_BACKEND_URL
        const {
            authReducer: { token },
        } = getState();

        const res = await axios.post(
            `${base_Url}/api/v1/product/add`,
            {
                name,
                price,
                listPrice,
                description,
                color,
                compatibleWith,
                category,
                imageUrl,
                stock
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const { product, message } = res.data;
        if (product) {
            toast.success(message);

            dispatch({
                type: "ADD_PRODUCT",
                payload: { product }
            });
        } else {
            toast.error(message);
            dispatch({ type: "ADD_PRODUCT_FAILED" });
        }
    } catch (error) {
        console.log(error.message);
        toast.error("Failed to add product");
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {

    try {
        const base_Url = process.env.REACT_APP_BACKEND_URL
        // Get token from Redux store
        const {
            authReducer: { token },
        } = getState();

        const res = await axios.delete(
            `${base_Url}/api/v1/product/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const { product, message } = res.data;
        if (product) {
            toast.success(message)

            dispatch({
                type: "DELETE_PRODUCT",
                payload: id
            })

        } else {
            toast.error(message)
            dispatch({
                type: "DELETE_PRODUCT_FAILED"
            })
        }
    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
    }
};

export const editProduct = (id, updatedData) => async (dispatch, getState) => {
    try {
        const base_Url = process.env.REACT_APP_BACKEND_URL;
        const {
            authReducer: { token },
        } = getState();

        const res = await axios.put(`${base_Url}/api/v1/product/update/${id}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const { product, message } = res.data;

        if (product) {
            toast.success(message)
            dispatch({
                type: "EDIT_PRODUCT",
                payload: product,
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const getProducts = (name, description) => async (dispatch) => {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/v1/product/all')
    const { products } = res.data
    dispatch({
        type: "GET_PRODUCTS",
        payload: { products }
    })
}