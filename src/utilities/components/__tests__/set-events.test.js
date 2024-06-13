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
		const element = document.createElement('div')
		const mockHandler = jest.fn()
		const events = [{ event_name: 'click', func: mockHandler }]

		const result = setEvents(element, events)
		element.click()

		expect(result).toBeTruthy()
		expect(mockHandler).toHaveBeenCalled()
	})

	it('should return false when events are not provided', () => {
		const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
		const element = document.createElement('div')

		const result = setEvents(element, null)

		expect(spyConsoleError).toHaveBeenCalledWith('No events to set.')
		expect(result).toBeFalsy()
		spyConsoleError.mockRestore()
	})

	it('should handle multiple events correctly', () => {
		const element = document.createElement('div')
		const mockClickHandler = jest.fn()
		const mockMouseOverHandler = jest.fn()
		const mockMouseDownHandler = jest.fn()
		const events = [
			{ event_name: 'click', func: mockClickHandler },
			{ event_name: 'mouseover', func: mockMouseOverHandler },
			{ event_name: 'mousedown', func: mockMouseDownHandler }
		]

		const result = setEvents(element, events)
		element.click()
		element.dispatchEvent(new MouseEvent('mouseover'))
		element.dispatchEvent(new MouseEvent('mousedown'))

		expect(result).toBeTruthy()
		expect(mockClickHandler).toHaveBeenCalled()
		expect(mockMouseOverHandler).toHaveBeenCalled()
		expect(mockMouseDownHandler).toHaveBeenCalled()
	})
})
