import Property from 'models/Property';
import Promise from 'bluebird';

function getProperties(index) {
  const URL = `http://www.rightmove.co.uk/api/_search?locationIdentifier=POSTCODE%5E277749&minBedrooms=1&maxPrice=1250&numberOfPropertiesPerPage=25&index=${index}&radius=5.0&sortType=6&index=0&maxDaysSinceAdded=3&includeLetAgreed=false&viewType=LIST&dontShow=houseShare%2Cretirement&channel=RENT&isFetching=false&mustHave=`;
  return fetch(URL)
    .then(resp => resp.json())
    .then(json => json.properties);
}



function addProperty(data) {
  if (data.propertySubType == "Studio") {
    return null;
  }

  if (data.propertyTypeFullDescription.toLowerCase().indexOf("share") > -1 ) {
    return null;
  }

  const property = new Property({
    rightmoveId: data.id,
    title: data.displayAddress,
    summary: data.summary,
    type: data.propertySubType,
    price: data.price.amount,
    feesApply: data.feesApply,
    distance: data.formattedDistance,
    images: Array.isArray(data.images) ? data.images.map(im => im.srcUrl) : null,
    propertyUrl: data.propertyUrl,
    originalData: data
  });


  console.log("Saving -- "+ data.id);
  return property.save().then(resp => {
    console.log('Saved '+ resp.id);
    return resp;
  }).catch(err => {
    console.log(err.message);
  });
}

function updateProperties(index, timeout) {

  console.log('Running with index ' + index);

  return getProperties(index)
    .then(properties => {
      console.log('Fetched '+ properties.length + ' properties.');
      if(properties.length < 10) {
        console.log('no properties');
        throw new Error('no properties');
        return false;
      }
      return properties.map(property => {
        return addProperty(property);
      }).filter(p => p !== null);
    })
    .then(_ => {
      console.log("Properties saved");
      return Promise.delay(timeout).then(resp => {
        return updateProperties(index + 25, timeout + 10)
      });
    })
    .catch(err => {
      console.log(err.message);
    });
}

updateProperties(0, 10);
