'use strict'

import { JSDOM } from 'jsdom'
import { removeEvents } from '../remove-events'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.MouseEvent = window.MouseEvent

describe('removeEvents', () => {
	it('should remove events from a valid HTML element', () => {
		const element = document.createElement('div')
		const mockHandler = jest.fn()
		element.addEventListener('click', mockHandler)

		const events = [{ event_name: 'click', func: mockHandler }]

		const result = removeEvents(element, events)
		element.click()

		expect(result).toBeTruthy()
		expect(mockHandler).not.toHaveBeenCalled()
	})

	it('should return false when events are not provided', () => {
		const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
		const element = document.createElement('div')

		const result = removeEvents(element, null)

		expect(spyConsoleError).toHaveBeenCalledWith('No events to remove.')
		expect(result).toBeFalsy()
		spyConsoleError.mockRestore()
	})

	it('should handle multiple events correctly', () => {
		const element = document.createElement('div')
		const mockClickHandler = jest.fn()
		const mockMouseOverHandler = jest.fn()
		const mockMouseDownHandler = jest.fn()

		element.addEventListener('click', mockClickHandler)
		element.addEventListener('mouseover', mockMouseOverHandler)
		element.addEventListener('mousedown', mockMouseDownHandler)

		const events = [
			{ event_name: 'click', func: mockClickHandler },
			{ event_name: 'mouseover', func: mockMouseOverHandler },
			{ event_name: 'mousedown', func: mockMouseDownHandler }
		]

		const result = removeEvents(element, events)
		element.click()
		element.dispatchEvent(new MouseEvent('mouseover'))
		element.dispatchEvent(new MouseEvent('mousedown'))

		expect(result).toBeTruthy()
		expect(mockClickHandler).not.toHaveBeenCalled()
		expect(mockMouseOverHandler).not.toHaveBeenCalled()
		expect(mockMouseDownHandler).not.toHaveBeenCalled()
	})
})
