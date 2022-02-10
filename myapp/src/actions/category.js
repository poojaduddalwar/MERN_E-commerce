import jwt from 'jsonwebtoken'
import toast from 'react-hot-toast'
import axios from 'axios'

export const addCategory = (name, description) => async (dispatch) => {

    try {
        const base_Url = 'http://localhost:8080'
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