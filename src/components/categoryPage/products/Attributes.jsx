import React, { Component } from "react";

export default class Attributes extends Component {
    getItems({ type, name, items }) {
        const className = type === "swatch" ? "category-attr__swatch" : "category-attr__item";
        return items.map((item) => (
            <div
                className={this.props.checkAttrActive(this.props.prodAttributes, this.props.productId, name, item.value) ? `${className} active` : className}
                onClick={() => this.props.updateAttrs(this.props.productId, name, item.value, item.displayValue, type)}
                key={item.id}
            >
                {type === "swatch" ? <div className="category-attr__swatch-item" style={{ background: item.value }}></div> : item.value}
            </div>
        ));
    }

    render() {
        return (
            <div className="category__attributes">
                {this.props.attributes.map((attr) => {
                    return (
                        <div className="category__attr category-attr" key={attr.name}>
                            <div className="category-attr__title">
                                {attr.name}: {this.props.getAttrValue(this.props.prodAttributes, this.props.productId, attr.name)}
                            </div>
                            <div className="category-attr__body">{this.getItems(attr)}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
