import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withRouter from "../../hoc/withRouter";
import { commonInitData, commonSetActiveCurrency, cartIncrement, cartDecrement } from "../../redux/actions";
import Body from "./body/Body";
import "./CartPage.scss";

class CartPage extends Component {
    componentDidMount() {
        const currency = this.props.router.params.currency;
        this.props.commonInitData(currency);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.router.params.currency !== this.props.router.params.currency) {
            const arr = this.props.currencies.filter((currency) => currency.label === this.props.router.params.currency);

            if (arr.length > 0) {
                this.props.commonSetActiveCurrency(arr[0]);
            }
        }
    }

    render() {
        const total = this.props.total.filter((price) => price.currency.label === this.props.activeCurrency.label)[0];
        return (
            <div className="cart">
                <div className="container">
                    <div className="cart__title">
                        {this.props.cart.length === 0 ? "Cart is empty" : "Cart"}
                        <span>Total: {total ? `${total.currency.symbol} ${total.amount}` : `${this.props.activeCurrency.symbol} 0`}</span>
                    </div>
                    <Body
                        cartDecrement={this.props.cartDecrement}
                        cartIncrement={this.props.cartIncrement}
                        currency={this.props.activeCurrency.label}
                        cart={this.props.cart}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currencies: state.common.currencies,
        activeCurrency: state.common.activeCurrency,
        total: state.cart.total,
        cart: state.cart.cart,
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps, {
        commonInitData,
        commonSetActiveCurrency,
        cartIncrement,
        cartDecrement,
    })
)(CartPage);
