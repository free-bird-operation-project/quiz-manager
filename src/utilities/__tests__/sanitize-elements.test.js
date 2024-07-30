import { JSDOM } from 'jsdom'
import { sanitizeElements } from '@utilities/sanitize-elements'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.MouseEvent = window.MouseEvent
global.DocumentFragment = window.DocumentFragment

describe('sanitizeElements', () => {
	beforeEach(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {})
	})

	afterEach(() => {
		console.error.mockRestore()
	})

	it('should return null and log an error when element is undefined or null', () => {
		expect(sanitizeElements(undefined, 'string')).toBeNull()
		expect(console.error).toHaveBeenCalledWith('Invalid input: element is required.')

		expect(sanitizeElements(null, 'string')).toBeNull()
		expect(console.error).toHaveBeenCalledWith('Invalid input: element is required.')
	})

	it('should return null and log an error when type is missing', () => {
		expect(sanitizeElements('test')).toBeNull()
		expect(console.error).toHaveBeenCalledWith('Invalid input: type is required.')
	})

	it('should return null and log an error when element is of an invalid type', () => {
		expect(sanitizeElements(new Date(), 'string')).toBeNull()
		expect(console.error).toHaveBeenCalledWith(
			'Notice: The element and type are not equal. Element is of type object, while type is string.'
		)
	})

	it('should return null and log an error when type is not a string', () => {
		expect(sanitizeElements('test', 123)).toBeNull()
		expect(console.error).toHaveBeenCalledWith('Invalid input: type must be a string.')
	})

	it('should return null and log an error when element does not match the specified type', () => {
		expect(sanitizeElements('test', 'number')).toBeNull()
		expect(console.error).toHaveBeenCalledWith(
			'Notice: The element and type are not equal. Element is of type string, while type is number.'
		)
	})

	it('should return the element if all validations pass', () => {
		expect(sanitizeElements('test', 'string')).toBe('test')
		expect(sanitizeElements(123, 'number')).toBe(123)
		expect(sanitizeElements([], 'array')).toEqual([])
		expect(sanitizeElements(null, 'null')).toBeNull()
		expect(sanitizeElements(document.createElement('div'), 'HTMLElement')).toBeInstanceOf(
			HTMLElement
		)
	})
})
