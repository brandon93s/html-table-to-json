'use strict'

const test = require('ava')
const HtmlTableToJson = require('./')

const singleEmpty = `<table></table>`
const doubleEmpty = `${singleEmpty}${singleEmpty}`
const [h1, h2, h3, h4] = ['test', 'header', 1, 'with space']

test('single table count is 1', t => {
  const _sut = new HtmlTableToJson(singleEmpty)

  t.is(_sut.count, 1)
})

test('double table count is 2', t => {
  const _sut = new HtmlTableToJson(doubleEmpty)

  t.is(_sut.count, 2)
})

const singleWithHeaderRow = `<table><tr><th>${h1}</th><th>${h2}</th><th>${h3}</th><th>${h4}</th></tr></table>`

test('extracts th headers correctly', t => {
  const toString = value => value + ''

  const headers = new HtmlTableToJson(singleWithHeaderRow).headers[0]

  t.is(headers[0], toString(h1))
  t.is(headers[1], toString(h2))
  t.is(headers[2], toString(h3))
  t.is(headers[3], toString(h4))
})

const singleWithoutHeaderRow = `<table>
                                  <tr><td>${h1}</td><td>${h2}</td><td>${h3}</td><td>${h4}</td></tr>
                                  <tr><td>A</td><td>B</td><td>C</td><td>D</td></tr>
                                </table>`

test('falls back to first row for headers', t => {
  const toString = value => value + ''

  const _sut = new HtmlTableToJson(singleWithoutHeaderRow)

  const headers = _sut.headers[0]
  t.is(headers[0], toString(h1))
  t.is(headers[1], toString(h2))
  t.is(headers[2], toString(h3))
  t.is(headers[3], toString(h4))

  const rows = _sut.results[0]
  t.is(rows[0][headers[0]], 'A')
  t.is(rows[0][headers[1]], 'B')
  t.is(rows[0][headers[2]], 'C')
  t.is(rows[0][headers[3]], 'D')
})

test('throws when html is not a string', t => {
  t.throws(() => new HtmlTableToJson({}))
  t.throws(() => new HtmlTableToJson([]))
  t.throws(() => new HtmlTableToJson(1))
  t.throws(() => new HtmlTableToJson(NaN))
  t.throws(() => new HtmlTableToJson(true))
})

test('parse method', t => {
  const _sut = HtmlTableToJson.parse(doubleEmpty)

  t.is(_sut.count, 2)
})

const sampleTable = `<table>
                        <tr>
                            <th>Animal</th>
                            <th>Color</th>
                            <th>Name</th>
                        </tr>
                        <tr>
                            <td>Unicorn</td>
                            <td>Pink</td>
                            <td>Billy</td>
                        </tr>
                        <tr>
                            <td>Walrus</td>
                            <td>Orange</td>
                            <td>Sue</td>
                        </tr>
                    </table>`

test('values option', t => {
  const _sut = new HtmlTableToJson(sampleTable, { values: true })

  t.is(_sut.count, 1)

  const results = _sut.results[0]
  t.is(results.length, 2)
  t.true(Array.isArray(results[0]))
  t.true(Array.isArray(results[1]))
  t.is(results[0][0], 'Unicorn')
  t.is(results[1][2], 'Sue')
})
