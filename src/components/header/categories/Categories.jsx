import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Categories extends Component {
    render() {
        if (this.props.categories.length === 0) {
            return null;
        }

        return (
            <div className="header__categories header-categories">
                {this.props.categories.map((category) => {
                    return (
                        <NavLink
                            className={
                                category.toLowerCase() === this.props.activeCategory.toLowerCase()
                                    ? "header-categories__item active"
                                    : "header-categories__item"
                            }
                            key={category}
                            to={`${this.props.activeCurrency.label}/category/${category}`}
                        >
                            {category}
                        </NavLink>
                    );
                })}
            </div>
        );
    }
}
