import jwtDecode from 'jwt-decode';

const isTokenValid = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

const validToken = storedToken && isTokenValid(storedToken);
const user = validToken && storedUser ? JSON.parse(storedUser) : null;

const initialState = {
  token: validToken ? storedToken : null,
  user: user,
};


const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    // console.log(state)
    switch (type) {
        case "SET_AUTH_TOKEN":
            return {
                ...state, ...payload
            }
        case "LOGIN_SUCCESS":
            return {
                ...payload,
                token: action.payload.token,
                user: action.payload.user
            }
        case "LOGIN_FAILED":
            return {
                ...payload
            }
        case "LOGOUT_SUCCESS":
            return {
                ...state, token: null
            }
        // case "LOGOUT_FAILED":
        //     return {
        //         ...payload
        //     }
        case "SIGNUP_SUCCESS":
            return {
                ...payload
            }
        case "SIGNUP_FAILED":
            return {
                ...payload
            }
        case "REFRESH_SIGNUP":
            return {
                ...state,
                signup: false
            }
        case "LOGOUT":
            return {
                token: null
            }
        default:
            return state
    }
}

export default authReducer;