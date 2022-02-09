import React, { PureComponent } from "react";

export default class Gallery extends PureComponent {
    render() {
        return (
            <div className="product-left__gallery">
                <div className="product-left__items">
                    {this.props.gallery.map((img, i) => {
                        return (
                            <div
                                onClick={() => this.props.setIndex(i)}
                                className={i === this.props.galleryIndex ? "product-left__item active" : "product-left__item"}
                                key={i}
                            >
                                <img src={img} alt="" />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
