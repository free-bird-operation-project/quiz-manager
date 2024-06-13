'use strict'

import { JSDOM } from 'jsdom'
import { hasValidAttributes, getActualType } from '../has-valid-attributes'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document

describe('hasValidAttributes', () => {
	it('should return true for a component with valid attributes', () => {
		const component = 'button'
		const config = {
			class_name: 'btn',
			id: 'button-1',
			text: 'Click Me',
			events: [],
			icon: 'icon-click',
			type: 'submit'
		}

		const result = hasValidAttributes(component, config)
		expect(result).toBe(true)
	})

	it('should return false for a component with invalid attributes', () => {
		const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
		const component = 'button'
		const config = {
			class_name: 'btn',
			id: 'button-1',
			text: 'Click Me',
			events: [],
			icon: 'icon-click',
			type: 'submit',
			invalid_attribute: 'invalid'
		}

		const result = hasValidAttributes(component, config)

		expect(spyConsoleError).toHaveBeenCalledWith(
			"The 'invalid_attribute' is not valid attribute for 'button'."
		)
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should return false for an invalid component', () => {
		const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
		const component = 'invalid_component'
		const config = {
			class_name: 'btn',
			id: 'button-1'
		}

		const result = hasValidAttributes(component, config)

		expect(spyConsoleError).toHaveBeenCalledWith('The invalid_component is not found in the list.')
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should return true for a valid component with an empty config', () => {
		const component = 'button'
		const config = {}

		const result = hasValidAttributes(component, config)
		expect(result).toBe(true)
	})

	it('should return false when no component is passed', () => {
		const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
		const config = {
			class_name: 'btn',
			id: 'button-1'
		}

		const result = hasValidAttributes(undefined, config)

		expect(spyConsoleError).toHaveBeenCalledWith('The undefined is not found in the list.')
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should return false when no config is passed', () => {
		const spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
		const component = 'button'

		const result = hasValidAttributes(component, null)

		expect(spyConsoleError).toHaveBeenCalledWith("The 'config' is not valid.")
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})
})
