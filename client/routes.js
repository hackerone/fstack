import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Relay from 'react-relay';
import Home from 'containers/Home';

const viewerQueries = {
  viewer: () => Relay.QL `query {viewer}`,
};

export default (
  <Route
    path="/"
    component={Home}
    queries={viewerQueries}
  />
);
