import React, { Component, Suspense } from "react";
import "./fonts/fonts.scss";
import "./App.scss";
import Header from "./components/header/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import CategoryPage from "./components/categoryPage/CategoryPage";
const CartPage = React.lazy(() => import("./components/cartPage/CartPage"));
const ProductPageContainer = React.lazy(() => import("./components/productPage/ProductPageContainer"));

export default class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Header />
                <Suspense fallback={null}>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Navigate to={`/USD/category/all`} />} />
                            <Route path=":currency">
                                <Route path="category/:category" element={<CategoryPage />} />
                                <Route path="product/:id" element={<ProductPageContainer />} />
                                <Route path="cart" element={<CartPage />} />
                            </Route>
                        </Route>
                    </Routes>
                </Suspense>
            </div>
        );
    }
}
