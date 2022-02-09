import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import withRouter from "../../../hoc/withRouter";
import arrow from "../../../img/arrow.svg";

class Currencies extends Component {
    render() {
        return (
            <div className="header__currencies header-currencies">
                <div className="header-currencies__current">
                    {this.props.activeCurrency.symbol} <img src={arrow} alt="" />
                </div>
                <div className="header-currencies__body">
                    <div className="header-currencies__list">
                        {this.props.currencies.map((currency) => {
                            const reg = new RegExp("\\w+");
                            const path = this.props.router.location.pathname.replace(reg, currency.label);
                            return (
                                <NavLink
                                    to={path}
                                    className={
                                        this.props.activeCurrency.label === currency.label ? "header-currencies__item active" : "header-currencies__item"
                                    }
                                    key={currency.label}
                                >
                                    {currency.symbol} {currency.label}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(withRouter)(Currencies);
