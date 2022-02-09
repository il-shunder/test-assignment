import { COMMON_SET_ACTIVE_CATEGORY, COMMON_SET_ACTIVE_CURRENCY, COMMON_SET_CATEGORIES, COMMON_SET_CURRENCIES } from "./types";

const initState = {
    categories: [],
    activeCategory: "",
    currencies: [],
    activeCurrency: {},
};

export function commonReducer(state = initState, action) {
    switch (action.type) {
        case COMMON_SET_CATEGORIES: {
            return {
                ...state,
                categories: action.categories,
            };
        }
        case COMMON_SET_ACTIVE_CATEGORY: {
            return {
                ...state,
                activeCategory: action.category,
            };
        }
        case COMMON_SET_CURRENCIES: {
            return {
                ...state,
                currencies: action.currencies,
            };
        }
        case COMMON_SET_ACTIVE_CURRENCY: {
            return {
                ...state,
                activeCurrency: action.currency,
            };
        }
        default:
            return state;
    }
}
