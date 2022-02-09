import React, { Component } from "react";
import ProductPage from "./ProductPage";
import { connect } from "react-redux";
import { compose } from "redux";
import withRouter from "../../hoc/withRouter";
import {
    commonInitData,
    commonSetActiveCurrency,
    productGetProduct,
    productSetGalleryIndex,
    updateAttrs,
    addToCart,
    checkSelectedAttrs,
    addedToCart,
    checkAttrActive,
    getAttrValue,
} from "../../redux/actions";

class ProductPageContainer extends Component {
    render() {
        return <ProductPage {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        currencies: state.common.currencies,
        activeCurrency: state.common.activeCurrency,
        product: state.product.product,
        galleryIndex: state.product.galleryIndex,
        prodAttributes: state.cart.prodAttributes,
        cart: state.cart.cart,
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps, {
        commonInitData,
        commonSetActiveCurrency,
        productGetProduct,
        productSetGalleryIndex,
        updateAttrs,
        addToCart,
        checkSelectedAttrs,
        addedToCart,
        checkAttrActive,
        getAttrValue,
    })
)(ProductPageContainer);
