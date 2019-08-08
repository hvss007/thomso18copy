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

const behindmyscenes = Loadable({
    loader: () => import("./blog1/index"),
    loading: loading
});

const litfest = Loadable({
    loader: () => import("./blog2/index"),
    loading: loading
});
const socialendeavours = Loadable({
    loader: () => import("./blog3/index"),
    loading: loading
});
const recentinnovation = Loadable({
    loader: () => import("./blog4/index"),
    loading: loading
});
const karwaan = Loadable({
    loader: () => import("./blog5/index"),
    loading: loading
});

export default class BlogIndex extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Route path="/blog/Behind_the_scenes" component={behindmyscenes} />
                <Route path="/blog/litfest" component={litfest} />
                <Route path="/blog/The_Social_Endeavours" component={socialendeavours} />
                <Route path="/blog/recent_innovation_at_iitr" component={recentinnovation} />
                <Route path="/blog/karwaan" component={karwaan} />
            </React.Fragment>
        );
    }
}