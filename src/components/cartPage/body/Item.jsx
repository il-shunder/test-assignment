import React, { Component } from "react";
import Attributes from "./Attributes";
import arrow from "../../../img/arrow-right.svg";
import { NavLink } from "react-router-dom";

export default class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
        };
        this.prevPhoto = this.prevPhoto.bind(this);
        this.nextPhoto = this.nextPhoto.bind(this);
    }

    prevPhoto(length) {
        this.setState((state) => {
            if (state.index === 0) {
                return { index: length - 1 };
            }
            return { index: state.index - 1 };
        });
    }

    nextPhoto(length) {
        this.setState((state) => {
            if (state.index === length - 1) {
                return { index: 0 };
            }
            return { index: state.index + 1 };
        });
    }

    render() {
        const item = this.props.item;
        const price = item.prices.filter((price) => price.currency.label === this.props.currency)[0];
        const changeCount = {
            productId: item.productId,
            attributes: item.attributes,
            prices: item.prices,
        };

        if (!price) return null;

        return (
            <div className="cart__item cart-item">
                <div className="cart-item__row">
                    <div className="cart-item__left">
                        <NavLink to={`/${this.props.currency}/product/${item.productId}`} className="cart-item__name">
                            {item.name}
                        </NavLink>
                        <div className="cart-item__brand">{item.brand}</div>
                        <div className="cart-item__price">
                            {price.currency.symbol} {(price.amount * item.count).toFixed(2)}
                        </div>
                        <Attributes attrs={item.attributes} />
                    </div>
                    <div className="cart-item__right">
                        <div className="cart-item__count">
                            <div className="cart-item__increment" onClick={() => this.props.cartIncrement(changeCount)}></div>
                            <div className="cart-item__value">{item.count}</div>
                            <div className="cart-item__decrement" onClick={() => this.props.cartDecrement(changeCount)}></div>
                        </div>
                        <div className="cart-item__img">
                            <img src={item.gallery[this.state.index]} alt="" />
                            <div className={item.gallery.length === 1 ? "cart-item__arrows disabled" : "cart-item__arrows"}>
                                <div className="cart-item__prev" onClick={() => this.prevPhoto(item.gallery.length)}>
                                    <img src={arrow} alt="" />
                                </div>
                                <div className="cart-item__next" onClick={() => this.nextPhoto(item.gallery.length)}>
                                    <img src={arrow} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
