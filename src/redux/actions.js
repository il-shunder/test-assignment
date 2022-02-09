import apolloQuery from "../apollo/apollo";
import {
    CART_UPDATE_PROD_ATTRS,
    CATEGORY_SET_PRODUCTS,
    CART_ADD_TO_CART,
    CART_INCREMENT,
    CART_DECREMENT,
    COMMON_SET_CATEGORIES,
    COMMON_SET_ACTIVE_CATEGORY,
    COMMON_SET_CURRENCIES,
    COMMON_SET_ACTIVE_CURRENCY,
    PRODUCT_SET_PRODUCT,
    PRODUCT_SET_GALLERY_INDEX,
} from "./types";

export const commonSetCategories = (categories) => ({ type: COMMON_SET_CATEGORIES, categories });
export const commonSetActiveCategory = (category) => ({ type: COMMON_SET_ACTIVE_CATEGORY, category });
export const commonSetCurrencies = (currencies) => ({ type: COMMON_SET_CURRENCIES, currencies });
export const commonSetActiveCurrency = (currency) => ({ type: COMMON_SET_ACTIVE_CURRENCY, currency });

export const categorySetProducts = (products) => ({ type: CATEGORY_SET_PRODUCTS, products });
export const cartUpdateProdAttributes = (object) => ({ type: CART_UPDATE_PROD_ATTRS, object });

export const cartAddToCart = (cartItem) => ({ type: CART_ADD_TO_CART, cartItem });
export const cartIncrement = (cartItem) => ({ type: CART_INCREMENT, cartItem });
export const cartDecrement = (cartItem) => ({ type: CART_DECREMENT, cartItem });

export const productSetProduct = (product) => ({ type: PRODUCT_SET_PRODUCT, product });
export const productSetGalleryIndex = (index) => ({ type: PRODUCT_SET_GALLERY_INDEX, index });

export const commonInitData = (urlCurrency = "", urlCategory = "") => {
    return async (dispatch) => {
        const response = await apolloQuery(`
        {
            categories{
                name
            }
            currencies{
                label
                symbol
            }
        }
        `);

        const categories = response.data.categories.map((category) => category.name);
        const currencies = response.data.currencies;
        const currency = currencies.filter((currency) => currency.label.toUpperCase() === urlCurrency.toUpperCase());

        dispatch(commonSetCategories(categories));
        dispatch(commonSetActiveCategory(urlCategory));

        dispatch(commonSetCurrencies(currencies));
        dispatch(commonSetActiveCurrency(currency[0]));
    };
};

export const categoryGetProducts = (category) => {
    return async (dispatch) => {
        const response = await apolloQuery(
            `
        query ($title: String!) {
            category(input: { title: $title }) {
                products {
                    attributes{
                        name
                        type
                        items{
                            id
                            value
                            displayValue
                        }
                    }
                    id
                    name
                    brand
                    inStock
                    gallery
                    prices {
                        amount
                        currency {
                            label
                            symbol
                        }
                    }
                }
            }
        }
        `,
            { title: category }
        );

        const products = response.data.category.products;
        dispatch(categorySetProducts(products));
    };
};

export const productGetProduct = (id) => {
    return async (dispatch) => {
        const response = await apolloQuery(
            `
        query ($id: String!) {
            product(id: $id) {
                id
                name
                gallery
                inStock
                description
                category
                brand
                attributes{
                    name
                    type
                    items{
                        id
                        value
                        displayValue
                    }
                }
                prices{
                    amount
                    currency{
                        label
                        symbol
                    }
                }   
            }
        }
        `,
            { id }
        );

        const product = response.data.product;
        dispatch(productSetProduct(product));
    };
};

export const updateAttrs = (productId, attributId, value, displayValue, type) => {
    return (dispatch) => {
        const object = {
            productId,
            attributes: [
                {
                    attributId,
                    value,
                    displayValue,
                    type,
                },
            ],
        };

        dispatch(cartUpdateProdAttributes(object));
    };
};

export const checkAttrActive = (prodAttributes, prodId, attrId, value) => {
    return (dispatch) => {
        return (
            prodAttributes.filter((product) => {
                if (product.productId === prodId) {
                    if (product.attributes.filter((attr) => attr.attributId === attrId && attr.value === value).length > 0) return product;
                    return null;
                }
                return null;
            }).length > 0
        );
    };
};

export const getAttrValue = (prodAttributes, prodId, attrId) => {
    return (dispatch) => {
        let value = "";
        for (let i = 0; i < prodAttributes.length; i++) {
            if (prodAttributes[i].productId === prodId) {
                const attrs = prodAttributes[i].attributes;
                for (let j = 0; j < attrs.length; j++) {
                    if (attrs[j].attributId === attrId) {
                        value = attrs[j].displayValue;
                        break;
                    }
                }
            }
        }
        return value;
    };
};

export const checkSelectedAttrs = (prodAttributes, prodId, attrsLength) => {
    return (dispatch) => {
        let result = true;
        if (attrsLength > 0) {
            result = false;
            for (let i = 0; i < prodAttributes.length; i++) {
                if (prodAttributes[i].productId === prodId && prodAttributes[i].attributes.length === attrsLength) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    };
};

export const addToCart = (prodAttributes, prodId, name, gallery, prices, brand) => {
    return (dispatch) => {
        const getAttributes = () => {
            const prod = prodAttributes.filter((prod) => prod.productId === prodId);

            if (prod.length > 0) return prod[0].attributes.map((attr) => ({ id: attr.attributId, value: attr.value, type: attr.type }));

            return [];
        };
        const cartItem = {
            productId: prodId,
            count: 1,
            name,
            brand,
            gallery,
            prices,
            attributes: getAttributes(),
        };

        dispatch(cartAddToCart(cartItem));
    };
};

export const addedToCart = (prodAttributes, cart, prodId) => {
    return (dispatch) => {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productId === prodId) {
                const itemAttrs = cart[i].attributes;
                let counter = 0;
                for (let j = 0; j < itemAttrs.length; j++) {
                    const actionAttrs = prodAttributes.filter((prod) => prod.productId === prodId)[0].attributes;
                    for (let k = 0; k < actionAttrs.length; k++) {
                        if (itemAttrs[j].id === actionAttrs[k].attributId && itemAttrs[j].value === actionAttrs[k].value) counter++;
                    }
                }
                if (counter === itemAttrs.length) {
                    return true;
                }
            }
        }
        return false;
    };
};
