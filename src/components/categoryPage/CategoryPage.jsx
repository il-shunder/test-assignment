import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withRouter from "../../hoc/withRouter";
import { commonSetActiveCategory, commonInitData, commonSetActiveCurrency, categoryGetProducts } from "../../redux/actions";
import "./CategoryPage.scss";
import Products from "./products/Products";

class CategoryPage extends Component {
    componentDidMount() {
        const category = this.props.router.params.category;
        const currency = this.props.router.params.currency;
        this.props.commonInitData(currency, category);
        this.props.categoryGetProducts(this.props.activeCategory);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeCategory !== this.props.router.params.category) {
            const arr = this.props.categories.filter((category) => category.toUpperCase() === this.props.router.params.category.toUpperCase());

            if (arr.length > 0) {
                this.props.commonSetActiveCategory(this.props.router.params.category);
                this.props.categoryGetProducts(this.props.router.params.category);
            }
        }
        if (prevProps.router.params.currency !== this.props.router.params.currency) {
            const arr = this.props.currencies.filter((currency) => currency.label === this.props.router.params.currency);

            if (arr.length > 0) {
                this.props.commonSetActiveCurrency(arr[0]);
            }
        }
    }

    render() {
        return (
            <div className="category">
                <div className="container">
                    <div className="category__title">{this.props.activeCategory.toUpperCase()}</div>
                    <Products />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        categories: state.common.categories,
        currencies: state.common.currencies,
        activeCategory: state.common.activeCategory,
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps, {
        commonSetActiveCurrency,
        commonSetActiveCategory,
        commonInitData,
        categoryGetProducts,
    })
)(CategoryPage);
