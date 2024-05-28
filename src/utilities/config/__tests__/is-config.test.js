'use strict'

import { JSDOM } from 'jsdom'
import { isConfig } from '../is-config'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document

describe('isConfig', () => {
	it('should return true for a valid config object', () => {
		const config = {
			button: 'chevron-left',
			id: 'exit-button-page',
			class_name: 'exit',
			events: [
				{
					event_name: 'click',
					func: () => {}
				}
			]
		}

		const result = isConfig(config)
		expect(result).toBe(true)
	})

	it('should return false when no config is passed', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})

		const result = isConfig()

		expect(spyConsoleError).toHaveBeenCalledWith(
			'No configuration has been passed!'
		)
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should return false for a null input', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})

		const result = isConfig(null)

		expect(spyConsoleError).toHaveBeenCalledWith(
			'No configuration has been passed!'
		)
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should return false for an undefined input', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})

		const result = isConfig(undefined)

		expect(spyConsoleError).toHaveBeenCalledWith(
			'No configuration has been passed!'
		)
		expect(result).toBe(false)
		spyConsoleError.mockRestore()
	})

	it('should return true for an empty object', () => {
		const result = isConfig({})
		expect(result).toBe(true)
	})
})
