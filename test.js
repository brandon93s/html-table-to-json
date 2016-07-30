'use strict';

import test from 'ava';
import HtmlTableToJson from './';

const singleEmpty = `<table></table>`;
const doubleEmpty = `${singleEmpty}${singleEmpty}`;
const [h1, h2, h3, h4] = ['test', 'header', 1, 'with space'];

test('single table count is 1', t => {
  const _sut = new HtmlTableToJson(singleEmpty);

  t.is(_sut.count, 1);
});

test('double table count is 2', t => {
  const _sut = new HtmlTableToJson(doubleEmpty);

  t.is(_sut.count, 2);
});

const singleWithHeaderRow = `<table><tr><th>${h1}</th><th>${h2}</th><th>${h3}</th><th>${h4}</th></tr></table>`;

test('extracts headers correctly', t => {
  const toString = value => value + '';

  const headers = new HtmlTableToJson(singleWithHeaderRow)._headers[0];

  t.is(headers[0], toString(h1));
  t.is(headers[1], toString(h2));
  t.is(headers[2], toString(h3));
  t.is(headers[3], toString(h4));
});

test('throws when html is not a string', t => {
  t.throws(() => new HtmlTableToJson({}));
  t.throws(() => new HtmlTableToJson([]));
  t.throws(() => new HtmlTableToJson(1));
  t.throws(() => new HtmlTableToJson(NaN));
  t.throws(() => new HtmlTableToJson(true));
});
