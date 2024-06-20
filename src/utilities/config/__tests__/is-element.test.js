'use strict'

import { JSDOM } from 'jsdom'
import { isElement } from '../is-element'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document

describe('isElement', () => {
	it('should return true for a valid string', () => {
		const result = isElement('div')
		expect(result).toBe(true)
	})

	it('should return false for a non-string input', () => {
		const result = isElement(123)
		expect(result).toBe(false)
	})

	it('should return false for null input', () => {
		const result = isElement(null)
		expect(result).toBe(false)
	})

	it('should return false for undefined input', () => {
		const result = isElement(undefined)
		expect(result).toBe(false)
	})

	it('should return false for an object input', () => {
		const result = isElement({ key: 'value' })
		expect(result).toBe(false)
	})

	it('should return false for an array input', () => {
		const result = isElement(['div'])
		expect(result).toBe(false)
	})
})
