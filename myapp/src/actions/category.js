import jwt from 'jsonwebtoken'
import toast from 'react-hot-toast'
import axios from 'axios'

export const addCategory = (name, description) => async (dispatch) => {

    try {
        const base_Url = 'https://pooja-ecommerce-api.herokuapp.com'
        const res = await axios.post(`${base_Url}/api/v1/category/add`, {
            name, description
        })
        // console.log(res.data)
        const { category, message } = res.data
        if (category) {
            toast.success(message)

            dispatch({
                type: "ADD_CATEGORY"
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

export const deleteCategory = (id) => async (dispatch) => {

    try {
        const base_Url = 'https://pooja-ecommerce-api.herokuapp.com'
        const res = await axios.delete(`${base_Url}/api/v1/category/delete/${id}`)
        console.log(res.data)
        const { category, message } = res.data
        if (category) {
            toast.success(message)

            dispatch({
                type: "DELETE_CATEGORY"
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