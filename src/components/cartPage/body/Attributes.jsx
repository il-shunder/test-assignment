import React, { Component } from "react";

export default class Attributes extends Component {
    render() {
        return (
            <div className="cart-item__attributes">
                {this.props.attrs.map((attr) => {
                    return (
                        <div className="cart-item__attr item-attr" key={attr.id}>
                            <div className="item-attr__name">{attr.id}:</div>
                            {attr.type === "swatch" ? (
                                <div className="item-attr__value-swatch" style={{ background: attr.value }}></div>
                            ) : (
                                <div className="item-attr__value">{attr.value}</div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
}
