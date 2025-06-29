import toast from 'react-hot-toast'
import axios from 'axios'

export const addCategory = (name, description) => async (dispatch, getState) => {

    try {
        const base_Url = process.env.REACT_APP_BACKEND_URL
        const {
            authReducer: { token },
        } = getState();
        
        const res = await axios.post(`${base_Url}/api/v1/category/add`,{
            name, description
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        // console.log(res.data)
        const { category, message } = res.data
        if (category) {
            toast.success(message)

            dispatch({
                type: "ADD_CATEGORY",
                payload: { category }
            })
        } else {
            toast.error(message)
            dispatch({
                type: "ADD_CATEGORY_FAILED"
            })
        }
    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
    }
};

export const deleteCategory = (id) => async (dispatch, getState) => {

    try {
        const base_Url = process.env.REACT_APP_BACKEND_URL
        const {
            authReducer: { token },
        } = getState();
        const res = await axios.delete(`${base_Url}/api/v1/category/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const { category, message } = res.data
        if (category) {
            toast.success(message)

            dispatch({
                type: "DELETE_CATEGORY",
                payload: id
            })
        } else {
            toast.error(message)
            dispatch({
                type: "DELETE_CATEGORY_FAILED"
            })
        }
    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
    }
};


export const editCategory = (id, updatedData) => async (dispatch, getState) => {

    try {
        const base_Url = process.env.REACT_APP_BACKEND_URL
        const {
            authReducer: { token },
        } = getState();
        const res = await axios.put(`${base_Url}/api/v1/category/update/${id}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const { category, message } = res.data
        if (category) {
            toast.success(message)

            dispatch({
                type: "EDIT_CATEGORY",
                payload: category
            })
        }
    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
    }
};