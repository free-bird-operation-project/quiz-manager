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
		const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
		const events = [{ type: 'click', func: () => {} }]

		const result = removeEventListeners(null, events)

		expect(result).toBe(false)
		expect(spyConsoleError).toHaveBeenCalledWith(
			'Cannot remove event listener! Check if the element or the events is valid.'
		)
		spyConsoleError.mockRestore()
	})

	it('should return false if the events array is not provided', () => {
		const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
		const element = document.createElement('div')

		const result = removeEventListeners(element, null)

		expect(result).toBe(false)
		expect(spyConsoleError).toHaveBeenCalledWith(
			'Cannot remove event listener! Check if the element or the events is valid.'
		)
		spyConsoleError.mockRestore()
	})

	it('should return false if any event object in the array is invalid', () => {
		const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
		const element = document.createElement('div')
		const events = [
			{ type: 'click', func: () => {} },
			{ type: 'mouseover', func: 'not a function' }
		]

		const result = removeEventListeners(element, events)

		expect(result).toBe(false)
		expect(spyConsoleError).toHaveBeenCalledWith(
			'Cannot remove event listener! Check if the element or the events is valid.'
		)
		spyConsoleError.mockRestore()
	})

	it('should log an error message when parameters are invalid', () => {
		const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
		const result = removeEventListeners(null, null)

		expect(result).toBe(false)
		expect(spyConsoleError).toHaveBeenCalledWith(
			'Cannot remove event listener! Check if the element or the events is valid.'
		)
		spyConsoleError.mockRestore()
	})
})
