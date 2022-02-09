import { PRODUCT_SET_GALLERY_INDEX, PRODUCT_SET_PRODUCT } from "./types";

const initState = {
    product: {},
    galleryIndex: 0,
};

export function productReducer(state = initState, action) {
    switch (action.type) {
        case PRODUCT_SET_PRODUCT: {
            return {
                ...state,
                product: {
                    ...action.product,
                    attributes: action.product.attributes.map((attr) => ({
                        ...attr,
                        items: attr.items.map((item) => ({ ...item })),
                    })),
                    prices: action.product.prices.map((price) => ({
                        ...price,
                        currency: { ...price.currency },
                    })),
                },
            };
        }
        case PRODUCT_SET_GALLERY_INDEX: {
            return {
                ...state,
                galleryIndex: action.index,
            };
        }

        default:
            return state;
    }
}
