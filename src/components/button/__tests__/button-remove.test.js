'use strict'

import { JSDOM } from 'jsdom'
import { removeButton } from '../button-remove'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document

describe('removeButton', () => {
	it('should remove the button if it exists', () => {
		document.body.innerHTML = '<div id="button-test"></div>'
		const config = { id: 'test' }

		removeButton(config)
		const button = document.getElementById('button-test')

		expect(button).toBeNull()
	})

	it('should do nothing if the button does not exist', () => {
		document.body.innerHTML = ''
		const config = { id: 'non-existent' }

		removeButton(config)
		const button = document.getElementById('button-non-existent')

		expect(button).toBeNull()
	})

	it('should handle cases where the id is missing from the config', () => {
		document.body.innerHTML = '<div id="button-test"></div>'
		const config = {}

		removeButton(config)
		const button = document.getElementById('button-test')

		expect(button).not.toBeNull()
	})
})
