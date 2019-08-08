// File is not being used currently

import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";
import Loader from "../common/Loader";
const Loading = ({ error }) => {
  if (error) {
    return <div>Error loading component</div>;
  } else {
    return <Loader />;
  }
};

const FAQIndex = Loadable({
  loader: () => import("./faq/Index"),
  loading: Loading
});

// const SponsorsIndex = Loadable({
//   loader: () => import("./sponsors/Index"),
//   loading: Loading
// });

const TeamIndex = Loadable({
  loader: () => import("./team/Index"),
  loading: Loading
});

const HomeIndex = Loadable({
  loader: () => import("./home/Index"),
  loading: Loading
});


export default class BetaIndex extends React.Component {
  render() {
    return (
      <React.Fragment >
        <Route exact path="/beta/" component={HomeIndex} />
        {/* <Route exact path="/beta/sponsors" component={SponsorsIndex} /> */}
        <Route exact path="/beta/team" component={TeamIndex} />
        <Route exact path="/beta/faq" component={FAQIndex} />
      </React.Fragment>
    );
  }
}
