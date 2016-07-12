import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { applyRouterMiddleware, Router, hashHistory } from 'react-router';
import useRelay from 'react-router-relay';
import routes from './routes';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    credentials: 'same-origin',
  })
);

const mountNode = document.createElement('div');
mountNode.style.height = '100%';
document.body.appendChild(mountNode);

ReactDOM.render(
  <Router
    history={hashHistory}
    routes={routes}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  />,
  mountNode
);
