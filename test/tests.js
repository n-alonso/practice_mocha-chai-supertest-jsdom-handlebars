const { assert } = require('chai')
const request = require('supertest')
const { JSDOM } = require('jsdom')

console.log(JSDOM)

const app = require('../index.js')

const parseTextFromHTML = (htmlAsString, selector) => {
    const dom = new JSDOM(htmlAsString).window.document
    const selectedElement = dom.querySelector(selector)
    if (selectedElement !== null) {
      return selectedElement.textContent
    } else {
      throw new Error(`No element with selector ${selector} found in HTML string`)
    }
};

describe('/', () => {
  describe('POST', () => {
    it('creates a new quote', async () => {
      // Setup
      const quote = 'Show must go on'
      const attributed = 'Freddy Mercury'
      const source = 'Anywhere'

      // Exercise
      const response = await request(app)
        .post('/')
        .type('form')
        .send({ quote, attributed, source })
      const parsedResponse = parseTextFromHTML(response.text, '#quotes')

      // Verify
      assert.equal(response.status, 200)
      assert.include(parsedResponse, quote)
      assert.include(parsedResponse, attributed)
      assert.include(parsedResponse, source)
    })
  })
  describe('GET', () => {
    it('loads root directory successfully', async () => {
      // Setup
      
      // Exercise
      const response = await request(app)
        .get('/')
        .send()
      
      // Verify
      assert.equal(response.status, 200)
    })
  })
})