import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";
import Loader from "../common/Loader";

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

const DelhiIndex = Loadable({
    loader: () => import("./delhi/Index"),
    loading: loading
});

const HomeIndex = Loadable({
    loader: () => import("./home/Index"),
    loading: loading
});

const LucknowIndex = Loadable({
    loader: () => import("./lucknow/Index"),
    loading: loading
});
const JaipurIndex= Loadable({
    loader: () => import("./jaipur/Index"),
    loading: loading
});
// const ChandigadhIndex= Loadable({
//     loader: () => import("./chandigadh/Index"),
//     loading: loading
// });
export default class ZonalsIndex extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Route path="/zonals/admin" component={AdminIndex} />
                <Route path="/zonals/delhi" component={DelhiIndex} />
                <Route path="/zonals/lucknow" component={LucknowIndex} />
                <Route path="/zonals/home" component={HomeIndex} />
                <Route path="/zonals/jaipur" component={JaipurIndex} />
                {/* <Route path="/zonals/chandigadh" component={ChandigadhIndex} /> */}
            </React.Fragment>
        );
    }
}

