import React, { Component } from 'react';
import Relay from 'react-relay';
import { List, ListItem, Button } from 'client/lib/sink';
import Property from 'components/Property';

type PropTypes = {
  viewer: Object
};

const Home = (props: PropTypes) => {

  const loadMore = () => {
    const count = props.relay.variables.count + 10;
    props.relay.setVariables({
      count: count
    });
  };

  return (<div>
    <h1></h1>
    <List>
      {props.viewer.properties.edges.map((edge, id) => (<ListItem key={id}>
        <Property property={edge.node} key={id} />
      </ListItem>))}
      <Button onClick={loadMore}>Load more...</Button>
    </List>
  </div>);
};

const queries = {
  initialVariables: {
    count: 100,
  },
  fragments: {
    viewer: () => Relay.QL `
      fragment on Viewer {
        id, name,
        properties(first: $count) {
          edges {
            node {
              ${Property.getFragment('property')}
            }
          }
        }
      }
    `,
  },
};

export default Relay.createContainer(Home, queries);
