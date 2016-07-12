import React from 'react';
import Relay from 'react-relay';
import styles from 'client/styles/property.css';

const Property = (prop) => {
  const {property} = prop;
  return (<div className={styles.wrapper}>
    <div className={styles.text}>
      <h4>{property.title}</h4>
      <div className={styles.meta}>
        <div>{property.availableDate}</div>
        <div>£{property.price}</div>
        <a className={styles.link} href={'http://www.rightmove.co.uk/'+property.propertyUrl} target='_blank'>ref: {property.rightmoveId}</a>
      </div>
      <div>{property.summary}</div>
    </div>
    <div className={styles.imagesWrap}>
      {property.images.map((src,id) => <img src={src} className={styles.image} key={id} />)}
    </div>
  </div>);
};

const queries = {
  fragments: {
    property: () => Relay.QL `
      fragment on Property {
        title,
        rightmoveId,
        summary,
        images,
        price,
        propertyUrl,
        availableDate
      }
    `,
  },
};

export default Relay.createContainer(Property, queries);
