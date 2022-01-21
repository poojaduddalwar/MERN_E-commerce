import jwt from 'jsonwebtoken'
import toast from 'react-hot-toast'

export const loginUser = (email, password) => {
    //in ideal situation we'll need to VERIFY EMAIL AND PASSWORD
    //create and sign a JWT
    const users = JSON.parse(localStorage.getItem('users'))
    const user = users.find(u => u.email === email)
    if (user.email === email && user.password === password) {
        const token = jwt.sign({ email: user.email }, 'SECRET')
        toast.success("LOGIN SUCCESSFUL !")
        return {
            type: 'LOGIN_SUCCESS',
            payload: { token }
        }
    } else {
        window.alert('Incorrect Creds');
        return {
            type: 'LOGIN_FAILED',
            payload: { token: null }
        }
    }
}