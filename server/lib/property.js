import cheerio from 'cheerio';
import fetch from 'isomorphic-fetch';
import striptags from 'striptags';

export function scrapeProperty(id) {
  const URL = `http://www.rightmove.co.uk/property-to-rent/property-${id}.html`;

  return fetch(URL).then(resp => resp.text() )
    .then(resp => {
    const $ = cheerio.load(resp, {
        withDomLvl1: true,
        normalizeWhitespace: true,
        recognizeSelfClosing: true,
        xmlMode: false,
        decodeEntities: true
    });
    const output = {
      lettingInfo: {}
    };
    $('#lettingInformation tr').each(function (i, tr) {
      const child = $('td', tr);
      if(child.first().text() == 'Date available:') {
        output.dateAvailable = child.last().text();
      }
      output.lettingInfo[child.first().text()] = child.last().text();
    });

    const html = $($('.sect').get(2)).html();
    output.html = striptags(html, ['h3','a', 'br']).replace(/\<br[^\>|]*\>/ig, "\n");

    return output;

  });
}
