# imap-criteria-transpiler

## Description

`imap-criteria-transpiler` is a library for transpiling intuitive queries into Imap criterias.

## Installation

```bash
# with npm
npm install --save imap-criteria-transpiler

# with yarn
yarn add imap-criteria-transpiler

# with pnpm
pnpm add imap-criteria-transpiler
```

## Documentation

You can use logic doors like AND, OR, NOT, ... (more will be added in the future)

You can use parentesis to manage priority levels

You can use simple quotes or double quotes to escape spaces or logic doors. You also can escaping spaces with anti-slashes

## Examples

```ts
import transpiler from 'imap-criteria-transpiler'

const query = 'from:foo AND to:bar'

const criteria = transpiler.parse(query)

console.log(criteria) // [['HEADERS', 'FROM', 'foo'], ['HEADERS', 'TO', 'bar']]

imap.search(criteria, (err, uuids) => {
  // Do anything you want
})
```
