const initialState = {
    categories: []
}

const categoryReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case "ADD_CATEGORY":
            return {
                ...state,
                categories: [...state.categories, payload.category]
            }
        case "ADD_CATEGORY_FAILED":
            return state
        case "DELETE_CATEGORY":
            return {
                ...state,
                categories: state.categories.filter(category => category._id !== payload)
            };
        case "DELETE_CATEGORY_FAILED":
            return state

        case "EDIT_CATEGORY":
            return {
                ...state,
                categories: [...state.categories, payload.category]
            };
        default:
            return state
    }
}

export default categoryReducer;

// here export default works as module.export so during import u can change the name like u can write :

// import categories from "./categoryReducer";

// but if it is module.export.something = value then during import we can't change the name
