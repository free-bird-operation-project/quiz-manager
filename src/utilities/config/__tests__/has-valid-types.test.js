'use strict'

import { JSDOM } from 'jsdom'
import { hasValidTypes } from '../has-valid-types'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document

describe('hasValidTypes', () => {
	it('should return true for a valid configuration object with correct types', () => {
		const config = {
			id: 'button-1',
			class_name: 'btn',
			text: 'Click Me',
			icon: 'icon-click',
			type: 'submit',
			events: [{ event_name: 'click', func: () => {} }],
			buttons: ['btn1', 'btn2'],
			group_name: 'group1',
			title: 'Title',
			placeholder: 'Enter text',
			z_index: 10,
			state: true,
			readonly: false,
			elements: { key: 'value' }
		}

		const result = hasValidTypes(config)
		expect(result).toBe(true)
	})

	it('should return false for a configuration object with incorrect types', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})
		const config = {
			id: 123, // should be a string
			class_name: true, // should be a string
			text: 'Click Me',
			icon: 'icon-click',
			type: 'submit',
			events: 'click', // should be an array
			buttons: 'btn1', // should be an array
			group_name: 'group1',
			title: 'Title',
			placeholder: 'Enter text',
			z_index: '10', // should be a number
			state: 'true', // should be a boolean
			readonly: 'false', // should be a boolean
			elements: {}
		}

		const result = hasValidTypes(config)

		expect(spyConsoleError).toHaveBeenCalledTimes(7) // 7 incorrect types
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should return false when no configuration object is passed', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})

		const result = hasValidTypes()

		expect(spyConsoleError).toHaveBeenCalledWith(
			"Make sure the 'config' is not empty."
		)
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should return false for an empty configuration object', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})
		const config = {}

		const result = hasValidTypes(config)

		expect(spyConsoleError).toHaveBeenCalledWith(
			"Make sure the 'config' is not empty."
		)
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should return false for null input', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})

		const result = hasValidTypes(null)

		expect(spyConsoleError).toHaveBeenCalledWith(
			"Make sure the 'config' is not empty."
		)
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should return false for undefined input', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})

		const result = hasValidTypes(undefined)

		expect(spyConsoleError).toHaveBeenCalledWith(
			"Make sure the 'config' is not empty."
		)
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})
})
