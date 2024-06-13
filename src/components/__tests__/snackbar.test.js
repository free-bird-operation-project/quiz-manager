'use strict'

import { JSDOM } from 'jsdom'
import { Snackbar } from '@components/snackbar'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.requestAnimationFrame = (callback) => {
	setTimeout(callback, 1000 / 60)
}

describe('Snackbar', () => {
	beforeEach(() => {
		document.body.innerHTML = null
	})

	describe('renderThenRemove', () => {
		it('should create a Snackbar instance with valid config', () => {
			const config = { message: 'The quiz pack is successfully imported!' }

			const snackbar = new Snackbar(config)

			expect(snackbar).toBeInstanceOf(Snackbar)
			expect(snackbar.renderThenRemove).toBeInstanceOf(Function)
		})

		it('should render and remove snackbar with valid config', () => {
			const config = { message: 'The quiz pack is successfully imported!' }

			const snackbar = new Snackbar(config)
			snackbar.renderThenRemove()

			expect(document.body).not.toBeNull()
			expect(document.body.querySelector('#snackbar').textContent).toBe(
				'The quiz pack is successfully imported!'
			)
		})
	})
})
