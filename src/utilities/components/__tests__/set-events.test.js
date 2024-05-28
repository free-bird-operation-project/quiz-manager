'use strict'

import { JSDOM } from 'jsdom'
import { setEvents } from '../set-events'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.MouseEvent = window.MouseEvent

describe('setEvents', () => {
	it('should set events on a valid HTML element', () => {
		document.body.innerHTML = '<div id="test-div"></div>'
		const mockHandler = jest.fn()
		const events = [{ event_name: 'click', func: mockHandler }]

		const result = setEvents('test-div', events)
		const element = document.getElementById('test-div')
		element.click()

		expect(result).toBe(true)
		expect(mockHandler).toHaveBeenCalled()
	})

	it('should return false when ID is not provided', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})
		const events = [{ event_name: 'click', func: () => {} }]

		const result = setEvents('', events)

		expect(spyConsoleError).toHaveBeenCalledWith('No ID to set events.')
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should return false when events are not provided', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})

		const result = setEvents('test-div', null)

		expect(spyConsoleError).toHaveBeenCalledWith('No events to set.')
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should return false when element with given ID is not found', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})
		const events = [{ event_name: 'click', func: () => {} }]

		const result = setEvents('nonexistent-id', events)

		expect(spyConsoleError).toHaveBeenCalledWith(
			'Element with ID nonexistent-id not found.'
		)
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should handle multiple events correctly', () => {
		document.body.innerHTML = '<div id="test-div"></div>'
		const mockClickHandler = jest.fn()
		const mockMouseOverHandler = jest.fn()
		const mockMouseDownHandler = jest.fn()
		const events = [
			{ event_name: 'click', func: mockClickHandler },
			{ event_name: 'mouseover', func: mockMouseOverHandler },
			{ event_name: 'mousedown', func: mockMouseDownHandler }
		]

		const result = setEvents('test-div', events)
		const element = document.getElementById('test-div')
		element.click()
		element.dispatchEvent(new MouseEvent('mouseover'))
		element.dispatchEvent(new MouseEvent('mousedown'))

		expect(result).toBe(true)
		expect(mockClickHandler).toHaveBeenCalled()
		expect(mockMouseOverHandler).toHaveBeenCalled()
		expect(mockMouseDownHandler).toHaveBeenCalled()
	})
})
