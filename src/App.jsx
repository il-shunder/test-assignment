import React, { Component, Suspense } from "react";
import "./fonts/fonts.scss";
import "./App.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import CategoryPage from "./components/categoryPage/CategoryPage";
import Layout from "./components/Layout";
const CartPage = React.lazy(() => import("./components/cartPage/CartPage"));
const ProductPageContainer = React.lazy(() => import("./components/productPage/ProductPageContainer"));

export default class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Suspense fallback={null}>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Navigate to={`/USD/category/all`} />} />
                            <Route path=":currency" element={<Layout />}>
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
