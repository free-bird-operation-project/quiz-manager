'use strict'

import { JSDOM } from 'jsdom'
import { createButton } from '../button-create'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement

describe('createButton', () => {
	it('should create a button with type "rounded-square" and icon', () => {
		const config = {
			type: 'rounded-square',
			id: 'test',
			class_name: 'btn',
			icon: 'icon-test',
			events: [{ event_name: 'click', func: () => {} }]
		}

		const button = createButton(config)

		expect(button).not.toBeNull()
		expect(button.id).toBe('button-test')
		expect(button.classList.contains('rounded-square-button')).toBe(true)
		expect(button.querySelector('[data-lucide="icon-test"]')).not.toBeNull()
	})

	it('should create a button with type "slab" and both text and icon', () => {
		const config = {
			type: 'slab',
			id: 'test',
			class_name: 'btn',
			text: 'Click Me',
			icon: 'icon-test',
			events: [{ event_name: 'click', func: () => {} }]
		}

		const button = createButton(config)

		expect(button).not.toBeNull()
		expect(button.id).toBe('button-test')
		expect(button.classList.contains('slab-button')).toBe(true)
		expect(button.querySelector('[data-lucide="icon-test"]')).not.toBeNull()
		expect(button.querySelector('p').textContent).toBe('Click Me')
	})

	it('should create a button with type "transparent" and text', () => {
		const config = {
			type: 'transparent',
			id: 'test',
			class_name: 'btn',
			text: 'Click Me',
			events: [{ event_name: 'click', func: () => {} }]
		}

		const button = createButton(config)

		expect(button).not.toBeNull()
		expect(button.id).toBe('button-test')
		expect(button.classList.contains('transparent-button')).toBe(true)
		expect(button.querySelector('p').textContent).toBe('Click Me')
	})

	it('should return undefined for a button with type "slab" but no text or icon', () => {
		const config = {
			type: 'slab',
			id: 'test',
			class_name: 'btn',
			events: [{ event_name: 'click', func: () => {} }]
		}

		const button = createButton(config)

		expect(button).toBeUndefined()
	})

	it('should return undefined for a button with type "transparent" but no text or icon', () => {
		const config = {
			type: 'transparent',
			id: 'test',
			class_name: 'btn',
			events: [{ event_name: 'click', func: () => {} }]
		}

		const button = createButton(config)

		expect(button).toBeUndefined()
	})

	it('should return undefined if events are not provided', () => {
		const spyConsoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => {})
		const config = {
			type: 'slab',
			id: 'test',
			class_name: 'btn',
			text: 'Click Me',
			icon: 'icon-test'
		}

		const button = createButton(config)

		expect(spyConsoleError).toHaveBeenCalledWith(
			'Button is useless without events.'
		)
		expect(button).toBeUndefined()
		spyConsoleError.mockRestore()
	})
})
