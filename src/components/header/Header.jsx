import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../img/logo.svg";
import Categories from "./categories/Categories";
import Currencies from "./currencies/Currencies";
import "./Header.scss";
import MiniCart from "./miniCart/MiniCart";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
        };
        this.setActive = this.setActive.bind(this);
    }

    setActive(value) {
        this.setState((state) => {
            return {
                isActive: value,
            };
        });
    }

    render() {
        return (
            <header>
                <div className="header">
                    <div className="container">
                        <div className="header__row">
                            <Categories
                                categories={this.props.categories}
                                activeCategory={this.props.activeCategory}
                                activeCurrency={this.props.activeCurrency}
                            />
                            <div className="header__logo">
                                <NavLink to={`/${this.props.activeCurrency.label}/category/${this.props.categories[0]}`}>
                                    <img src={logo} alt="logo" />
                                </NavLink>
                            </div>
                            <div className="header__functional">
                                <Currencies
                                    currencies={this.props.currencies}
                                    activeCurrency={this.props.activeCurrency}
                                    activeCategory={this.props.activeCategory}
                                />
                                <MiniCart isActive={this.state.isActive} setActive={this.setActive} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.state.isActive ? "shadow active" : "shadow"}></div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        categories: state.common.categories,
        activeCategory: state.common.activeCategory,
        activeCurrency: state.common.activeCurrency,
        currencies: state.common.currencies,
    };
}

export default connect(mapStateToProps)(Header);
