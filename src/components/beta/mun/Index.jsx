import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";
import Loader from "../../common/Loader";

const loading = ({ error }) => {
    if (error) {
        return <div>Error loading component</div>;
    } else {
        return <Loader />;
    }
};

const AdminIndex = Loadable({
    loader: () => import("./admin/Index"),
    loading: loading
});

const HomeIndex = Loadable({
    loader: () => import("./home/Index"),
    loading: loading
});

export default class MUNIndex extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Route exact path="/mun" component={HomeIndex} />
                <Route path="/mun/admin" component={AdminIndex} />
            </React.Fragment>
        );
    }
}

