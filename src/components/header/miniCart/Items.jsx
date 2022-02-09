import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Items extends Component {
    render() {
        if (this.props.cart.length === 0) {
            return <div className="mini-cart__empty">Cart is empty</div>;
        }

        return (
            <div className="mini-cart__items">
                {this.props.cart.map((item, i) => {
                    const price = item.prices.filter((price) => price.currency.label === this.props.currency)[0];
                    const changeCount = {
                        productId: item.productId,
                        attributes: item.attributes,
                        prices: item.prices,
                    };

                    if (!price) return null;

                    return (
                        <div className="mini-cart__item mini-cart-item" key={i}>
                            <div className="mini-cart-item__row">
                                <div className="mini-cart-item__left">
                                    <div className="mini-cart-item__name">
                                        <NavLink to={`/${this.props.currency}/product/${item.productId}`} onClick={() => this.props.setActive(false)}>
                                            {item.name}
                                        </NavLink>
                                    </div>
                                    <div className="mini-cart-item__price">
                                        {price.currency.symbol} {(price.amount * item.count).toFixed(2)}
                                    </div>
                                    <div className="mini-cart-item__attributes">
                                        {item.attributes.map((attr) => {
                                            return (
                                                <div className="mini-cart-item__attribute" key={attr.id}>
                                                    <div className="mini-cart-item__id">{attr.id}:</div>
                                                    {attr.type === "swatch" ? (
                                                        <div className="mini-cart-item__value-swatch" style={{ background: attr.value }}></div>
                                                    ) : (
                                                        <div className="mini-cart-item__value">{attr.value}</div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="mini-cart-item__right">
                                    <div className="mini-cart-item__count">
                                        <div className="mini-cart-item__increment" onClick={() => this.props.cartIncrement(changeCount)}></div>
                                        <div className="mini-cart-item__count-value">{item.count}</div>
                                        <div className="mini-cart-item__decrement" onClick={() => this.props.cartDecrement(changeCount)}></div>
                                    </div>
                                    <div className="mini-cart-item__img">
                                        <img src={item.gallery[0]} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
