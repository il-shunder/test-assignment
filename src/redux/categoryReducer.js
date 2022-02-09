import { CATEGORY_SET_PRODUCTS } from "./types";

const initState = {
    products: [],
};

export function categoryReducer(state = initState, action) {
    switch (action.type) {
        case CATEGORY_SET_PRODUCTS: {
            return {
                ...state,
                products: action.products,
            };
        }
        default:
            return state;
    }
}
