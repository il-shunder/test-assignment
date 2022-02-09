import React, { Component } from "react";
import withRouter from "../../hoc/withRouter";

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.router.location !== prevProps.router.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);
