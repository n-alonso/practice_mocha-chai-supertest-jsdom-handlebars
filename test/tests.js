// test/routes/index-test.js
const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');

const app = require('../../app');

const parseTextFromHTML = (htmlAsString, selector) => {
    const selectedElement = jsdom(htmlAsString).querySelector(selector);
    if (selectedElement !== null) {
      return selectedElement.textContent;
    } else {
      throw new Error(`No element with selector ${selector} found in HTML string`);
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
















