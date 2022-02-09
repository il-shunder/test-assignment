import React, { Component } from "react";
import { connect } from "react-redux";
import cart from "../../../img/cart.svg";
import Items from "./Items";
import { cartIncrement, cartDecrement } from "../../../redux/actions";
import { NavLink } from "react-router-dom";

class MiniCart extends Component {
    constructor(props) {
        super(props);

        this.cartContent = React.createRef();
        this.onClick = this.onClick.bind(this);
    }

    onClick = (e) => {
        if (
            this.props.isActive &&
            !this.cartContent.current.contains(e.target) &&
            !e.target.closest(".mini-cart__icon") &&
            !e.target.classList.contains("mini-cart-item__decrement")
        ) {
            this.props.setActive(false);
        }
    };

    componentDidMount() {
        document.addEventListener("click", this.onClick);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.onClick);
    }

    render() {
        const total = this.props.total.filter((price) => price.currency.label === this.props.activeCurrency.label)[0];
        return (
            <div className={this.props.isActive ? "mini-cart active" : "mini-cart"}>
                <div className="mini-cart__icon" onClick={() => this.props.setActive(!this.props.isActive)}>
                    <img src={cart} alt="" />
                    {this.props.count > 0 ? <span>{this.props.count}</span> : null}
                </div>
                <div className="mini-cart__content" ref={this.cartContent}>
                    <div className="mini-cart__body">
                        <div className="mini-cart__title">
                            <span>My Bag, </span>
                            {this.props.count} {this.props.count === 1 ? "item" : "items"}
                        </div>
                        <Items
                            cart={this.props.cart}
                            currency={this.props.activeCurrency.label}
                            cartIncrement={this.props.cartIncrement}
                            cartDecrement={this.props.cartDecrement}
                            setActive={this.props.setActive}
                        />
                        <div className="mini-cart__total">
                            <div className="mini-cart__total-name">Total</div>
                            <div className="mini-cart__total-value">
                                {total ? `${total.currency.symbol} ${total.amount}` : `${this.props.activeCurrency.symbol} 0`}
                            </div>
                        </div>
                        <div className="mini-cart__subrow">
                            <NavLink to={`/${this.props.activeCurrency.label}/cart`} onClick={() => this.props.setActive(false)} className="mini-cart__btn bag">
                                View bag
                            </NavLink>
                            <div className="mini-cart__btn check" onClick={() => this.props.setActive(false)}>
                                CHECK OUT
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        total: state.cart.total,
        count: state.cart.count,
        activeCurrency: state.common.activeCurrency,
    };
}

export default connect(mapStateToProps, { cartIncrement, cartDecrement })(MiniCart);
