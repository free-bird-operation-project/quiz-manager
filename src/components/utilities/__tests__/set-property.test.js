import { JSDOM } from 'jsdom'
import { setProperty } from '../set-property'

let dom = new JSDOM('<!DOCTYPE html><input id="test-input"><div id="test-div"></div>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.HTMLInputElement = window.HTMLInputElement
global.HTMLDivElement = window.HTMLDivElement

describe('setProperty', () => {
	let inputElement
	let divElement

	beforeEach(() => {
		inputElement = document.getElementById('test-input')
		divElement = document.getElementById('test-div')
	})

	afterEach(() => {
		dom = new JSDOM('<!DOCTYPE html><input id="test-input"><div id="test-div"></div>')
	})

	describe('Setting properties on elements', () => {
		it('should set readOnly property on input element', () => {
			const attributes = { readOnly: true }

			const result = setProperty(inputElement, attributes)

			expect(result).toBe(true)
			expect(inputElement.readOnly).toBe(true)
		})

		it('should set hidden property on div element', () => {
			const attributes = { hidden: true }

			const result = setProperty(divElement, attributes)

			expect(result).toBe(true)
			expect(divElement.hidden).toBe(true)
		})

		it('should not set properties if attributes are invalid', () => {
			const attributes = { readOnly: 'true', hidden: 0 }

			const result = setProperty(inputElement, attributes)

			expect(result).toBe(false)
			expect(divElement.hidden).toBe(false) // default value
			expect(inputElement.readOnly).toBe(false) // default value
		})

		it('should return false if element is invalid', () => {
			const attributes = { readOnly: true }

			const result = setProperty(null, attributes)

			expect(result).toBe(false)
		})

		it('should return false if attributes are not provided', () => {
			const result = setProperty(inputElement, null)

			expect(result).toBe(false)
		})

		it('should return false if attributes object is empty', () => {
			const result = setProperty(inputElement, {})

			expect(result).toBe(false)
		})

		it('should return false if key is not "readOnly" or "hidden"', () => {
			const attributes = { disabled: true }

			const result = setProperty(inputElement, attributes)

			expect(result).toBe(false)
		})
	})
})
