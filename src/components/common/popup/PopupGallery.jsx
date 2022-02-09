import React, { Component } from "react";
import "./PopupGallery.scss";
import arrow from "../../../img/arrow-right.svg";

export default class PopupGallery extends Component {
    constructor(props) {
        super(props);
        this.content = React.createRef();
    }

    onClick = (e) => {
        if (this.props.isActive && !this.content.current.contains(e.target) && !e.target.closest(this.props.exception)) {
            this.props.setActive(false);
        }
    };

    componentDidMount() {
        document.addEventListener("click", this.onClick);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.onClick);
    }

    render() {
        return (
            <div className={this.props.isActive ? "popup active" : "popup"}>
                <div className="popup__body">
                    <div className="popup__content" ref={this.content}>
                        <div className="popup__prev" onClick={this.props.prevPhoto}>
                            <img src={arrow} alt="" />
                        </div>
                        <div className="popup__img">
                            <img src={this.props.img} alt="" />
                        </div>
                        <div className="popup__next" onClick={this.props.nextPhoto}>
                            <img src={arrow} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
