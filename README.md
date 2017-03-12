<h1 align="center">
  <br>
  in-progress.js
  <br>
  <br>
</h1>
<p align="center">
  <a href="https://circleci.com/gh/Leko/in-progress.js/tree/master"><img src="https://circleci.com/gh/Leko/in-progress.js/tree/master.svg?style=shield" alt="CircleCI"></a>
  <a href="https://codecov.io/gh/Leko/in-progress.js"><img src="https://codecov.io/gh/Leko/in-progress.js/branch/master/graph/badge.svg" alt="Codecov" /></a>
  <a href="https://www.npmjs.com/package/in-progress"><img src="https://img.shields.io/npm/v/in-progress.svg" alt="npm version"></a>
  <a href="https://github.com/Leko/in-progress.js"><img src="https://img.shields.io/bower/v/in-progress.svg" alt="npm version"></a>
</p>
<h4 align="center">Prevent screen transition if any state changed.</h4>

## Getting started
```
npm install in-progress
bower install in-progress
```

## Usage
```js
import { FormValueDetector } from 'in-progress'

const formElement = document.querySelector('#some-form')
const detector = new FormValueDetector(formElement)
detector.observe()
```

View [live demo](https://leko.github.io/in-progress.js/)
