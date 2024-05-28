'use strict'

import { isConfigVerified } from '../config-verifier'
import { isElement } from '../is-element'
import { isConfig } from '../is-config'
import { hasValidAttributes } from '../has-valid-attributes'
import { hasValidTypes } from '../has-valid-types'

jest.mock('../is-element')
jest.mock('../is-config')
jest.mock('../has-valid-attributes')
jest.mock('../has-valid-types')

describe('isConfigVerified', () => {
	it('should return true when all checks pass', () => {
		isElement.mockReturnValue(true)
		isConfig.mockReturnValue(true)
		hasValidAttributes.mockReturnValue(true)
		hasValidTypes.mockReturnValue(true)

		const element = 'button'
		const config = {
			class_name: 'btn',
			id: 'button-1',
			text: 'Click Me',
			events: [],
			icon: 'icon-click',
			type: 'submit'
		}

		const result = isConfigVerified(element, config)

		expect(result).toBe(true)
	})

	it('should return false when element check fails', () => {
		isElement.mockReturnValue(false)
		isConfig.mockReturnValue(true)
		hasValidAttributes.mockReturnValue(true)
		hasValidTypes.mockReturnValue(true)

		const element = 'button'
		const config = {
			class_name: 'btn',
			id: 'button-1',
			text: 'Click Me',
			events: [],
			icon: 'icon-click',
			type: 'submit'
		}

		const result = isConfigVerified(element, config)

		expect(result).toBe(false)
	})

	it('should return false when config check fails', () => {
		isElement.mockReturnValue(true)
		isConfig.mockReturnValue(false)
		hasValidAttributes.mockReturnValue(true)
		hasValidTypes.mockReturnValue(true)

		const element = 'button'
		const config = {
			class_name: 'btn',
			id: 'button-1',
			text: 'Click Me',
			events: [],
			icon: 'icon-click',
			type: 'submit'
		}

		const result = isConfigVerified(element, config)

		expect(result).toBe(false)
	})

	it('should return false when attributes check fails', () => {
		isElement.mockReturnValue(true)
		isConfig.mockReturnValue(true)
		hasValidAttributes.mockReturnValue(false)
		hasValidTypes.mockReturnValue(true)

		const element = 'button'
		const config = {
			class_name: 'btn',
			id: 'button-1',
			text: 'Click Me',
			events: [],
			icon: 'icon-click',
			type: 'submit'
		}

		const result = isConfigVerified(element, config)

		expect(result).toBe(false)
	})

	it('should return false when types check fails', () => {
		isElement.mockReturnValue(true)
		isConfig.mockReturnValue(true)
		hasValidAttributes.mockReturnValue(true)
		hasValidTypes.mockReturnValue(false)

		const element = 'button'
		const config = {
			class_name: 'btn',
			id: 'button-1',
			text: 'Click Me',
			events: [],
			icon: 'icon-click',
			type: 'submit'
		}

		const result = isConfigVerified(element, config)

		expect(result).toBe(false)
	})
})
