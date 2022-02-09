import React, { PureComponent } from "react";

export default class Attributes extends PureComponent {
    getItems({ type, name, items }) {
        const className = type === "swatch" ? "product-attr__swatch" : "product-attr__item";
        return items.map((item) => (
            <div
                className={this.props.checkAttrActive(this.props.prodAttributes, this.props.productId, name, item.value) ? `${className} active` : className}
                onClick={() => this.props.updateAttrs(this.props.productId, name, item.value, item.displayValue, type)}
                key={item.id}
            >
                {type === "swatch" ? <div className="product-attr__swatch-item" style={{ background: item.value }}></div> : item.value}
            </div>
        ));
    }

    render() {
        return (
            <div className="product-right__attributes">
                {this.props.attrs.map((attr) => {
                    return (
                        <div className={this.props.inStock ? "product-attr" : "product-attr disabled"} key={attr.name}>
                            <div className="product-right__title">
                                {attr.name}: {this.props.getAttrValue(this.props.prodAttributes, this.props.productId, attr.name)}
                            </div>
                            <div className="product-attr__row">{this.getItems(attr)}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
