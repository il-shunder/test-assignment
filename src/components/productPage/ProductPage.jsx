import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Attributes from "./attributes/Attributes";
import Gallery from "./gallery/Gallery";
import "./ProductPage.scss";
import check_mark from "../../img/check_mark.svg";
import PopupGallery from "../common/popup/PopupGallery";

export default class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.desc = React.createRef();
        this.state = {
            isPopupActive: false,
        };
        this.prevPhoto = this.prevPhoto.bind(this);
        this.nextPhoto = this.nextPhoto.bind(this);
        this.setActive = this.setActive.bind(this);
    }

    componentDidMount() {
        const id = this.props.router.params.id;
        const currency = this.props.router.params.currency;
        this.props.commonInitData(currency);
        this.props.productGetProduct(id);
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.router.params.currency !== this.props.router.params.currency) {
            const arr = this.props.currencies.filter((currency) => currency.label === this.props.router.params.currency);

            if (arr.length > 0) {
                this.props.commonSetActiveCurrency(arr[0]);
            }
        }
        if (prevProps.router.params.id !== this.props.router.params.id) {
            const id = this.props.router.params.id;
            await this.props.productGetProduct(id);
            this.props.productSetGalleryIndex(0);
            this.desc.current.textContent = "";
        }

        if (this.desc.current && this.desc.current.textContent.length === 0) {
            this.desc.current.insertAdjacentHTML("beforeend", `${this.props.product.description}`);
        }
    }

    componentWillUnmount() {
        this.props.productSetGalleryIndex(0);
    }

    prevPhoto() {
        if (this.props.galleryIndex === 0) {
            this.props.productSetGalleryIndex(this.props.product.gallery.length - 1);
        } else {
            this.props.productSetGalleryIndex(this.props.galleryIndex - 1);
        }
    }

    nextPhoto() {
        if (this.props.galleryIndex === this.props.product.gallery.length - 1) {
            this.props.productSetGalleryIndex(0);
        } else {
            this.props.productSetGalleryIndex(this.props.galleryIndex + 1);
        }
    }

    setActive(value) {
        if (value) {
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = lockPaddingValue;
        } else {
            document.body.style.paddingRight = "0px";
            document.body.style.overflowX = "auto";
            document.body.style.overflowY = "scroll";
        }
        this.setState({ isPopupActive: value });
    }

    getBtn({ id, name, attributes, gallery, prices, brand, inStock }) {
        if (this.props.addedToCart(this.props.prodAttributes, this.props.cart, id)) {
            return (
                <NavLink to={`/${this.props.activeCurrency.label}/cart`} className="product-right__added">
                    <div className="product-right__added-body">
                        <div className="product-right__check-mark">
                            <img src={check_mark} alt="" />
                        </div>
                        <span>Added to Cart</span>
                    </div>
                </NavLink>
            );
        } else if (inStock) {
            return (
                <div
                    className={
                        this.props.checkSelectedAttrs(this.props.prodAttributes, id, attributes.length) ? "product-right__btn active" : "product-right__btn"
                    }
                    onClick={() => this.props.addToCart(this.props.prodAttributes, id, name, gallery, prices, brand)}
                >
                    ADD TO CART
                </div>
            );
        }
        return null;
    }

    render() {
        const product = this.props.product;
        if (Object.keys(product).length === 0) return null;
        const inStock = product.inStock;

        return (
            <>
                <PopupGallery
                    prevPhoto={this.prevPhoto}
                    nextPhoto={this.nextPhoto}
                    isActive={this.state.isPopupActive}
                    setActive={this.setActive}
                    exception=".product-left__img"
                    img={product.gallery[this.props.galleryIndex]}
                />
                <div className="product">
                    <div className="container">
                        <div className="product__row">
                            <div className="product__left product-left">
                                <Gallery setIndex={this.props.productSetGalleryIndex} galleryIndex={this.props.galleryIndex} gallery={product.gallery} />
                                <div className="product-left__img" onClick={() => this.setActive(true)}>
                                    <img src={product.gallery[this.props.galleryIndex]} alt="" />
                                </div>
                            </div>
                            <div className="product__right product-right">
                                <div className="product-right__body">
                                    <div className="product-right__name">{product.name}</div>
                                    <div className="product-right__brand">{product.brand}</div>
                                    <div className={inStock ? "product-right__stock" : "product-right__stock out"}>
                                        <div className="product-right__title">{inStock ? "In Stock" : "Out of Stock"}</div>
                                    </div>
                                    <div className="product-right__category">
                                        <div className="product-right__title">Category: {product.category}</div>
                                    </div>
                                    <Attributes
                                        updateAttrs={this.props.updateAttrs}
                                        productId={product.id}
                                        prodAttributes={this.props.prodAttributes}
                                        attrs={product.attributes}
                                        inStock={inStock}
                                        checkAttrActive={this.props.checkAttrActive}
                                        getAttrValue={this.props.getAttrValue}
                                    />
                                    <div className="product-right__price">
                                        <div className="product-right__title">Price:</div>
                                        <div className="product-right__value">
                                            {product.prices
                                                .filter((price) => price.currency.label === this.props.activeCurrency.label)
                                                .map((price) => `${price.currency.symbol} ${price.amount}`)}
                                        </div>
                                    </div>
                                    {this.getBtn(product)}
                                    <div className="product-right__desc" ref={this.desc}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
