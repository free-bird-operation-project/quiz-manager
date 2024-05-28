'use strict'

import { JSDOM } from 'jsdom'
import { setAttributes } from '../set-attributes'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement

describe('setAttributes', () => {
	it('should set valid attributes on a valid HTML element', () => {
		const element = document.createElement('div')
		const attributes = {
			id: 'sample-div',
			class: 'container',
			style: 'color: blue;'
		}

		const result = setAttributes(element, attributes)

		expect(result).toBe(true)
		expect(element.getAttribute('id')).toBe('sample-div')
		expect(element.getAttribute('class')).toBe('container')
		expect(element.getAttribute('style')).toBe('color: blue;')
	})

	it('should return false when element is not provided', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})
		const attributes = {
			id: 'sample-div',
			class: 'container',
			style: 'color: red;'
		}

		const result = setAttributes(null, attributes)

		expect(spyConsoleError).toHaveBeenCalledWith(
			'The element must be provided.'
		)
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should return false when attributes are not provided or empty', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})
		const element = document.createElement('div')

		const resultEmpty = setAttributes(element, {})
		expect(spyConsoleError).toHaveBeenCalledWith(
			'The attributes must be provided.'
		)
		expect(resultEmpty).toBe(false)

		const resultNull = setAttributes(element, null)
		expect(spyConsoleError).toHaveBeenCalledWith(
			'The attributes must be provided.'
		)
		expect(resultNull).toBe(false)

		spyConsoleError.mockRestore()
	})

	it('should return false when element provided is not a valid HTML element', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})
		const element = 'not an HTML element'
		const attributes = {
			id: 'sample-div',
			class: 'container',
			style: 'color: red;'
		}

		const result = setAttributes(element, attributes)

		expect(spyConsoleError).toHaveBeenCalledWith(
			'The element provided is not a valid HTML element.'
		)
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should return false when attributes provided are not a valid object', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})
		const element = document.createElement('div')
		const attributes = 'not an object'

		const result = setAttributes(element, attributes)

		expect(spyConsoleError).toHaveBeenCalledWith(
			'The attributes provided are not a valid object.'
		)
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})
})
