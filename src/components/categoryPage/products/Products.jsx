import React, { Component } from "react";
import { connect } from "react-redux";
import { updateAttrs, addToCart, checkSelectedAttrs, addedToCart, checkAttrActive, getAttrValue } from "../../../redux/actions";
import cart from "../../../img/white-cart.svg";
import check_mark from "../../../img/check_mark.svg";
import Attributes from "./Attributes";
import { NavLink } from "react-router-dom";

class Products extends Component {
    render() {
        return (
            <div className="category__row">
                {this.props.products.map((product) => {
                    return (
                        <div className={product.inStock ? "category-product" : "category-product out-of-stock"} key={product.id}>
                            <div className={product.attributes.length > 0 ? "category-product__info" : "category-product__info without-flip"}>
                                <div
                                    className={
                                        this.props.checkSelectedAttrs(this.props.prodAttributes, product.id, product.attributes.length)
                                            ? this.props.addedToCart(this.props.prodAttributes, this.props.cart, product.id)
                                                ? "category-product__btn clicked"
                                                : "category-product__btn active"
                                            : "category-product__btn"
                                    }
                                >
                                    <div
                                        className="category-product__cart"
                                        onClick={() =>
                                            this.props.addToCart(
                                                this.props.prodAttributes,
                                                product.id,
                                                product.name,
                                                product.gallery,
                                                product.prices,
                                                product.brand
                                            )
                                        }
                                    >
                                        <img src={cart} alt="" />
                                    </div>
                                    <NavLink to={`/${this.props.activeCurrency.label}/cart`} className="category-product__check-mark">
                                        <img src={check_mark} alt="" />
                                    </NavLink>
                                </div>
                                <div className="category-product__img">
                                    <img src={product.gallery[0]} alt="" />
                                </div>
                                <Attributes
                                    prodAttributes={this.props.prodAttributes}
                                    updateAttrs={this.props.updateAttrs}
                                    productId={product.id}
                                    attributes={product.attributes}
                                    checkAttrActive={this.props.checkAttrActive}
                                    getAttrValue={this.props.getAttrValue}
                                />
                            </div>
                            <div className="category-product__name">
                                <NavLink to={`/${this.props.activeCurrency.label}/product/${product.id}`}>{product.name}</NavLink>
                            </div>
                            <div className="category-product__price">
                                {product.prices
                                    .filter((price) => price.currency.label === this.props.activeCurrency.label)
                                    .map((price) => `${price.currency.symbol} ${price.amount}`)}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeCurrency: state.common.activeCurrency,
        products: state.category.products,
        prodAttributes: state.cart.prodAttributes,
        cart: state.cart.cart,
    };
}

export default connect(mapStateToProps, {
    updateAttrs,
    addToCart,
    checkSelectedAttrs,
    addedToCart,
    checkAttrActive,
    getAttrValue,
})(Products);
