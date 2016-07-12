'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../lib/db');

var _db2 = _interopRequireDefault(_db);

var _property = require('../lib/property');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropertySchema = new _db2.default.Schema({
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
  originalData: _db2.default.Schema.Types.Mixed,
  create_date: { type: Date, default: Date.now }
});

PropertySchema.pre('save', function (next, done) {
  var _this = this;

  Property.count({
    rightmoveId: this.rightmoveId
  }).then(function (count) {
    if (count > 0) {
      done(new Error('Property already exists.'));
    } else {
      if (!_this.created) {
        (0, _property.scrapeProperty)(_this.rightmoveId).then(function (resp) {
          _this.availableDate = resp.dateAvailable;
          _this.description = resp.html;
          _this.info = resp.lettingInfo;
          next();
        });
      } else {
        next();
      }
    }
  }).catch(function (err) {
    console.log(err);
  });
});

var Property = _db2.default.model('Property', PropertySchema);

exports.default = Property;