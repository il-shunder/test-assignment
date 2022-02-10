import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";

export default class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                <Outlet />
            </div>
        );
    }
}
