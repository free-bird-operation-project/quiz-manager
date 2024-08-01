import { JSDOM } from 'jsdom'
import { removeEventListeners } from '../remove-event-listeners'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.MouseEvent = window.MouseEvent
global.DocumentFragment = window.DocumentFragment

describe('removeEventListeners', () => {
	it('should remove event listeners from a valid HTML element', () => {
		const element = document.createElement('div')
		const handleClick = jest.fn()
		element.addEventListener('click', handleClick)

		const events = [{ type: 'click', func: handleClick }]
		const result = removeEventListeners(element, events)

		expect(result).toBe(true)
		element.click()
		expect(handleClick).not.toHaveBeenCalled()
	})

	it('should return false if the element is not provided', () => {
		const events = [{ type: 'click', func: () => {} }]

		const result = removeEventListeners(null, events)

		expect(result).toBe(false)
	})

	it('should return false if the events array is not provided', () => {
		const element = document.createElement('div')

		const result = removeEventListeners(element, null)

		expect(result).toBe(false)
	})

	it('should return false if any event object in the array is invalid', () => {
		const element = document.createElement('div')
		const events = [
			{ type: 'click', func: () => {} },
			{ type: 'mouseover', func: 'not a function' }
		]

		const result = removeEventListeners(element, events)

		expect(result).toBe(false)
	})

	it('should log comprehensive errors if validation fails', () => {
		const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
		const element = document.createElement('div')
		// Falsy event type
		const result = removeEventListeners(element, [{ type: 12, func: () => {} }])
		expect(result).toBe(false)

		// Comprehensive Errors
		expect(spyConsoleError).toHaveBeenNthCalledWith(
			1,
			'Notice: The value and type are not equal. Value is of type number, while type is string.'
		)
		expect(spyConsoleError).toHaveBeenNthCalledWith(
			2,
			'Cannot remove event listeners! Check if the element or the events is valid.'
		)

		spyConsoleError.mockRestore()
	})
})
