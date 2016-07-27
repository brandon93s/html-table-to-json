'use strict';

const cheerio = require('cheerio');

module.exports = function (html, options) {
  if (typeof html !== 'string') {
    throw new TypeError('Expected a string');
  }

  options = options || {};

  const $ = cheerio.load(html);

  let results = [];
  $('table').each((i, element) => results.push(processTable($, element, options)));

  if (options.unwrapTable)
    return results[0];

  return results;
};

function processTable($, table, options) {
  const headers = buildHeaders($, table, options);

  let tableJson = [];
  $(table).find('tr').each((i, element) => tableJson.push(processRow($, element, options, headers)));

  tableJson = pruneEmptyRows(tableJson);

  return tableJson;
}

function processRow($, row, options, headers) {
  let rowJson = {};

  $(row).find('td').each((i, cell) => {
    rowJson[headers[i] || (i + 1)] = $(cell).text().trim();
  });

  return rowJson;
}

function buildHeaders($, table, options) {
  let headers = [];

  $(table).find('tr').each((i, row) => {
    $(row).find('th').each((j, cell) => {
      headers[j] = $(cell).text().trim();
    });
  });

  return headers;
}

function pruneEmptyRows(table) {
  return table.filter(t => Object.keys(t).length);
}
