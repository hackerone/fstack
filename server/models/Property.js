import db from 'lib/db';
import {scrapeProperty} from 'lib/property';

const PropertySchema = new db.Schema({
  rightmoveId: Number,
  title: String,
  summary: String,
  description: String,
  type: String,
  price: Number,
  feesApply: String,
  distance: String,
  images: [String],
  info: [String],
  availableDate: String,
  status: String,
  propertyUrl: String,
  originalData: db.Schema.Types.Mixed,
  create_date: { type: Date, default: Date.now }
});

PropertySchema.pre('save', function (next, done) {
  Property.count({
    rightmoveId: this.rightmoveId
  }).then(count => {
    if(count > 0) {
      done(new Error('Property already exists.'));
    } else {
      if(!this.created) {
        scrapeProperty(this.rightmoveId)
        .then(resp => {
          this.availableDate = resp.dateAvailable;
          this.description = resp.html;
          this.info = resp.lettingInfo;
          next();
        });
      } else {
        next();
      }
    }
  })
  .catch(err => {
    console.log(err);
  });
})

const Property = db.model('Property', PropertySchema);

export default Property;
