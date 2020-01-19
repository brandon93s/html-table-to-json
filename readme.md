# html-table-to-json [![Build Status](https://travis-ci.org/brandon93s/html-table-to-json.svg?branch=master)](https://travis-ci.org/brandon93s/html-table-to-json)

> Extracts tables from a provided html snippet and converts them to JSON objects

## Install

```
$ npm install html-table-to-json
```


## Usage

```js
const HtmlTableToJson = require('html-table-to-json');

const jsonTables = HtmlTableToJson.parse(`
        <table>
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
        </table>
    `);

console.log(jsonTables.results);
/* => [[
 *      {Animal: 'Unicorn', Color: 'Pink', Name: 'Billy'},
 *      {Animal: 'Walrus', Color: 'Orange', Name: 'Sue'}
 *    ]]
 */

console.log(jsonTables.count);
// => 1

```


## API

### HtmlTableToJson.parse(input [,options])

#### input

Type: `string`

Any html snippet.

#### options

Type: `object`

##### values

Type: `bool`

Return table rows as value arrays:

```js
// HtmlTableToJson.parse(html, { values: true })
/* => [[
 *      ['Unicorn', 'Pink', 'Billy'],
 *      ['Walrus', 'Orange', 'Sue']
 *    ]]
 */
```

## Headers

HtmlTableToJson extracts table headers ( `th` ) to be used as JSON object keys.  The first row is used when no `th` elements are present.

## License

MIT © [Brandon Smith](https://github.com/brandon93s)
