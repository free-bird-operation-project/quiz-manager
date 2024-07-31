import { JSDOM } from 'jsdom'
import { sanitizeValue } from '@utilities/sanitize-value'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.MouseEvent = window.MouseEvent
global.DocumentFragment = window.DocumentFragment

describe('sanitizeValue', () => {
	beforeEach(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {})
	})

	afterEach(() => {
		console.error.mockRestore()
	})

	it('should return null and log an error when value is undefined or null', () => {
		expect(sanitizeValue(undefined, 'string')).toBeNull()
		expect(console.error).toHaveBeenCalledWith('Invalid input: value is required.')

		expect(sanitizeValue(null, 'string')).toBeNull()
		expect(console.error).toHaveBeenCalledWith('Invalid input: value is required.')
	})

	it('should return null and log an error when type is missing', () => {
		expect(sanitizeValue('test')).toBeNull()
		expect(console.error).toHaveBeenCalledWith('Invalid input: type is required.')
	})

	it('should return null and log an error when value is of an invalid type', () => {
		expect(sanitizeValue(new Date(), 'string')).toBeNull()
		expect(console.error).toHaveBeenCalledWith(
			'Notice: The value and type are not equal. Value is of type object, while type is string.'
		)
	})

	it('should return null and log an error when type is not a string', () => {
		expect(sanitizeValue('test', 123)).toBeNull()
		expect(console.error).toHaveBeenCalledWith('Invalid input: type must be a string.')
	})

	it('should return null and log an error when value does not match the specified type', () => {
		expect(sanitizeValue('test', 'number')).toBeNull()
		expect(console.error).toHaveBeenCalledWith(
			'Notice: The value and type are not equal. Value is of type string, while type is number.'
		)
	})

	it('should return the value if all validations pass', () => {
		expect(sanitizeValue('test', 'string')).toBe('test')
		expect(sanitizeValue(123, 'number')).toBe(123)
		expect(sanitizeValue([], 'array')).toEqual([])
		expect(sanitizeValue(null, 'null')).toBeNull()
		expect(sanitizeValue(document.createElement('div'), 'HTMLElement')).toBeInstanceOf(HTMLElement)
	})
})
