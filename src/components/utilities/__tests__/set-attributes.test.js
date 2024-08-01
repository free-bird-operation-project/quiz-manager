import { JSDOM } from 'jsdom'
import { setAttributes } from '../set-attributes'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.MouseEvent = window.MouseEvent
global.DocumentFragment = window.DocumentFragment

describe('setAttributes', () => {
	it('should set attributes on a valid HTML element', () => {
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

	it('should return false if the element is not provided', () => {
		const attributes = {
			id: 'sample-div',
			class: 'container',
			style: 'color: red;'
		}

		const result = setAttributes(null, attributes)

		expect(result).toBe(false)
	})

	it('should return false if the attributes object is not provided', () => {
		const element = document.createElement('div')

		const result = setAttributes(element, null)

		expect(result).toBe(false)
	})

	it('should return false if the attributes object is empty', () => {
		const element = document.createElement('div')
		const attributes = {}

		const result = setAttributes(element, attributes)

		expect(result).toBe(false)
	})

	it('should not set attributes if the element is invalid', () => {
		const element = 'not an HTML element'
		const attributes = {
			id: 'sample-div',
			class: 'container',
			style: 'color: red;'
		}

		const result = setAttributes(element, attributes)

		expect(result).toBe(false)
	})

	it('should set attributes with special characters correctly', () => {
		const element = document.createElement('div')
		const attributes = {
			'data-special': 'special',
			'data-test': 'test',
			'data-123': '123'
		}

		const result = setAttributes(element, attributes)

		expect(result).toBe(true)
		expect(element.getAttribute('data-special')).toBe('special')
		expect(element.getAttribute('data-test')).toBe('test')
		expect(element.getAttribute('data-123')).toBe('123')
	})
})
