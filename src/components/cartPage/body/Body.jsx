import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Item from "./Item";

export default class Body extends Component {
    render() {
        if (this.props.cart.length === 0) {
            return (
                <NavLink to={`/${this.props.currency}/category/all`} className="cart__empty">
                    Start Shopping
                </NavLink>
            );
        }
        return (
            <div className="cart__body">
                {this.props.cart.map((item, i) => (
                    <Item
                        currency={this.props.currency}
                        cartIncrement={this.props.cartIncrement}
                        cartDecrement={this.props.cartDecrement}
                        item={item}
                        key={i}
                    />
                ))}
            </div>
        );
    }
}
