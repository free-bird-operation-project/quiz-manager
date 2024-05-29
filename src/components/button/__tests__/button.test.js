'use strict'

import { Button } from '../button'
import { createButton } from '../button-create'
import { removeButton } from '../button-remove'
import { isConfigVerified } from '../../../utilities/config/config-verifier'

jest.mock('../../../utilities/config/config-verifier')
jest.mock('../button-create')
jest.mock('../button-remove')

describe('Button', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should create a button instance with valid config', () => {
		isConfigVerified.mockReturnValue(true)
		const config = {
			type: 'rounded-square',
			id: 'test',
			class_name: 'btn',
			icon: 'icon-test',
			events: [{ event_name: 'click', func: () => {} }]
		}

		const button = new Button(config)

		expect(button.config).toEqual(config)
	})

	it('should create a button instance with empty config', () => {
		const button = new Button({})

		expect(button.config).toEqual({})
	})

	it('should not create a button instance with invalid config', () => {
		isConfigVerified.mockReturnValue(false)
		const config = {
			type: 'invalid-type',
			id: 'test',
			class_name: 'btn',
			icon: 'icon-test',
			events: [{ event_name: 'click', func: () => {} }]
		}

		const button = new Button(config)

		expect(isConfigVerified).toHaveBeenCalledWith('button', config)
		expect(button.config).toEqual({})
	})

	it('should call createButton when create method is invoked', () => {
		isConfigVerified.mockReturnValue(true)
		const config = {
			type: 'rounded-square',
			id: 'test',
			class_name: 'btn',
			icon: 'icon-test',
			events: [{ event_name: 'click', func: () => {} }]
		}
		const button = new Button(config)

		button.create()

		expect(createButton).toHaveBeenCalledWith(config)
	})

	it('should call removeButton when remove method is invoked', () => {
		isConfigVerified.mockReturnValue(true)
		const config = {
			type: 'rounded-square',
			id: 'test',
			class_name: 'btn',
			icon: 'icon-test',
			events: [{ event_name: 'click', func: () => {} }]
		}
		const button = new Button(config)

		button.remove()

		expect(removeButton).toHaveBeenCalledWith(config)
	})
})
