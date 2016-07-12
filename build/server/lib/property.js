'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrapeProperty = scrapeProperty;

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _striptags = require('striptags');

var _striptags2 = _interopRequireDefault(_striptags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scrapeProperty(id) {
  var URL = 'http://www.rightmove.co.uk/property-to-rent/property-' + id + '.html';

  return (0, _isomorphicFetch2.default)(URL).then(function (resp) {
    return resp.text();
  }).then(function (resp) {
    var $ = _cheerio2.default.load(resp, {
      withDomLvl1: true,
      normalizeWhitespace: true,
      recognizeSelfClosing: true,
      xmlMode: false,
      decodeEntities: true
    });
    var output = {
      lettingInfo: {}
    };
    $('#lettingInformation tr').each(function (i, tr) {
      var child = $('td', tr);
      if (child.first().text() == 'Date available:') {
        output.dateAvailable = child.last().text();
      }
      output.lettingInfo[child.first().text()] = child.last().text();
    });

    var html = $($('.sect').get(2)).html();
    output.html = (0, _striptags2.default)(html, ['h3', 'a', 'br']).replace(/\<br[^\>|]*\>/ig, "\n");

    return output;
  });
}