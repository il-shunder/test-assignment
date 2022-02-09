import { CART_ADD_TO_CART, CART_DECREMENT, CART_INCREMENT, CART_UPDATE_PROD_ATTRS } from "./types";

const initState = {
    cart: [],
    total: [],
    count: 0,
    prodAttributes: [],
};

export function cartReducer(state = initState, action) {
    switch (action.type) {
        case CART_ADD_TO_CART: {
            const newState = {
                ...state,
                cart: state.cart.map((item) => ({
                    ...item,
                    attributes: item.attributes.map((attr) => ({ ...attr })),
                    prices: item.prices.map((price) => ({
                        ...price,
                        currency: { ...price.currency },
                    })),
                })),
                total: state.total.map((price) => ({
                    ...price,
                    currency: { ...price.currency },
                })),
            };

            state.total.length === 0 ? (newState.total = action.cartItem.prices) : setTotal(newState, action.cartItem.prices, true);
            newState.count = newState.count + 1;
            newState.cart.push({ ...action.cartItem });

            return {
                ...newState,
            };
        }
        case CART_INCREMENT: {
            const newState = {
                ...state,
                cart: state.cart.map((item) => ({
                    ...item,
                    attributes: item.attributes.map((attr) => ({ ...attr })),
                    prices: item.prices.map((price) => ({
                        ...price,
                        currency: { ...price.currency },
                    })),
                })),
                total: state.total.map((price) => ({
                    ...price,
                    currency: { ...price.currency },
                })),
            };

            changeItemCount(newState, action.cartItem, true);
            setTotal(newState, action.cartItem.prices, true);
            newState.count = newState.count + 1;

            return {
                ...newState,
            };
        }
        case CART_DECREMENT: {
            const newState = {
                ...state,
                cart: state.cart.map((item) => ({
                    ...item,
                    attributes: item.attributes.map((attr) => ({ ...attr })),
                    prices: item.prices.map((price) => ({
                        ...price,
                        currency: { ...price.currency },
                    })),
                })),
                total: state.total.map((price) => ({
                    ...price,
                    currency: { ...price.currency },
                })),
            };

            changeItemCount(newState, action.cartItem, false);
            setTotal(newState, action.cartItem.prices, false);
            newState.count = newState.count - 1;

            return {
                ...newState,
            };
        }
        case CART_UPDATE_PROD_ATTRS: {
            if (state.prodAttributes.length === 0) {
                return {
                    ...state,
                    prodAttributes: [action.object],
                };
            }

            const newState = {
                ...state,
                prodAttributes: state.prodAttributes.map((product) => ({
                    ...product,
                    attributes: product.attributes.map((attr) => ({ ...attr })),
                })),
            };

            let productFlag = false;
            const prodAttributes = newState.prodAttributes.map((product) => {
                if (product.productId === action.object.productId) {
                    productFlag = true;
                    let attrFlag = false;
                    const attributes = product.attributes.map((attr) => {
                        if (attr.attributId === action.object.attributes[0].attributId) {
                            attrFlag = true;
                            attr.value = action.object.attributes[0].value;
                            attr.displayValue = action.object.attributes[0].displayValue;
                            attr.type = action.object.attributes[0].type;
                        }
                        return attr;
                    });
                    if (!attrFlag) {
                        attributes.push({
                            attributId: action.object.attributes[0].attributId,
                            value: action.object.attributes[0].value,
                            displayValue: action.object.attributes[0].displayValue,
                            type: action.object.attributes[0].type,
                        });
                    }
                    return {
                        ...product,
                        attributes: attributes,
                    };
                }
                return product;
            });

            if (!productFlag) {
                prodAttributes.push({
                    productId: action.object.productId,
                    attributes: [
                        {
                            attributId: action.object.attributes[0].attributId,
                            value: action.object.attributes[0].value,
                            displayValue: action.object.attributes[0].displayValue,
                            type: action.object.attributes[0].type,
                        },
                    ],
                });
            }

            return {
                ...newState,
                prodAttributes,
            };
        }
        default:
            return state;
    }
}

function setTotal(state, prices, isPlus) {
    const total = state.total;
    for (let i = 0; i < prices.length; i++) {
        for (let j = 0; j < total.length; j++) {
            if (prices[i].currency.label === total[j].currency.label) {
                state.total[j].amount = isPlus
                    ? Number((state.total[j].amount + prices[i].amount).toFixed(2))
                    : Number((state.total[j].amount - prices[i].amount).toFixed(2));
            }
        }
    }
}

function changeItemCount(state, cartItem, isPlus) {
    const items = state.cart;
    for (let i = 0; i < items.length; i++) {
        if (items[i].productId === cartItem.productId) {
            const itemAttrs = items[i].attributes;
            let counter = 0;
            for (let j = 0; j < itemAttrs.length; j++) {
                const attrs = cartItem.attributes;
                for (let k = 0; k < attrs.length; k++) {
                    if (itemAttrs[j].id === attrs[k].id && itemAttrs[j].value === attrs[k].value) counter++;
                }
            }
            if (counter === itemAttrs.length) {
                if (isPlus) {
                    state.cart[i].count = state.cart[i].count + 1;
                } else {
                    if (state.cart[i].count > 1) {
                        state.cart[i].count = state.cart[i].count - 1;
                    } else {
                        state.cart.splice(i, 1);
                    }
                }
            }
        }
    }
}
