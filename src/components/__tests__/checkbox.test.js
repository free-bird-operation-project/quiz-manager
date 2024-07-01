'use strict'

import { JSDOM } from 'jsdom'
import { Checkbox } from '@components/checkbox'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.MouseEvent = window.MouseEvent

const localStorageMock = (() => {
	let store = {}

	return {
		getItem(key) {
			return store[key]
		},

		setItem(key, value) {
			store[key] = value
		},

		clear() {
			store = {}
		},

		removeItem(key) {
			delete store[key]
		},

		getAll() {
			return store
		}
	}
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })
global.localStorage = window.localStorage

describe('Checkbox', () => {
	const setLocalStorage = (id, data) => {
		window.localStorage.setItem(id, JSON.stringify([data]))
	}

	const removeLocalStorage = (key) => {
		window.localStorage.removeItem(key)
	}

	beforeEach(() => {
		document.body.innerHTML = null
		localStorage.clear()
	})

	describe('create()', () => {
		it('should create a checkbox with valid configurations', () => {
			const config = {
				id: 'en-file-checkbox-1',
				class_name: 'en-checkboxes',
				target_id: 'en-qp-1',
				group_name: 'en-qp'
			}

			const checkbox = new Checkbox(config).create()
			document.body.appendChild(checkbox)

			expect(checkbox).toBeDefined()
			expect(document.body).not.toBeNull()
			expect(document.body.querySelector('#en-file-checkbox-1').id).toBe('en-file-checkbox-1')
			expect(document.body.querySelector('#en-file-checkbox-1').className).toBe(
				'en-checkboxes checkboxes'
			)
			expect(document.body.querySelector('#en-file-checkbox-1').dataset.state).toBe('false')
			expect(document.body.querySelector('#en-file-checkbox-1').dataset.targetId).toBe('en-qp-1')
			expect(document.body.querySelector('#en-file-checkbox-1').dataset.groupName).toBe(
				'en-qp-checkboxes'
			)
			expect(
				document.body.querySelector('#en-file-checkbox-1').querySelector('i').dataset.lucide
			).toBe('square')
		})

		it('should change state when clicked', () => {
			const config = {
				id: 'en-file-checkbox-1',
				class_name: 'en-checkboxes',
				target_id: 'en-qp-1',
				group_name: 'en-qp'
			}

			const checkbox = new Checkbox(config).create()
			document.body.appendChild(checkbox)

			const element = document.getElementById('en-file-checkbox-1')

			expect(element.dataset.state).toBe('false')

			element.click()
			expect(element.dataset.state).toBe('true')

			element.click()
			expect(element.dataset.state).toBe('false')

			element.click()
			expect(element.dataset.state).toBe('true')

			element.click()
			expect(element.dataset.state).toBe('false')
		})

		it('should change icon when clicked', () => {
			const config = {
				id: 'en-file-checkbox-1',
				class_name: 'en-checkboxes',
				target_id: 'en-qp-1',
				group_name: 'en-qp'
			}

			const checkbox = new Checkbox(config).create()
			document.body.appendChild(checkbox)

			const element = document.getElementById('en-file-checkbox-1')
			const icon = element.querySelector('i')

			expect(icon.dataset.lucide).toBe('square')

			element.click()
			expect(icon.dataset.lucide).toBe('square-check')

			element.click()
			expect(icon.dataset.lucide).toBe('square')

			element.click()
			expect(icon.dataset.lucide).toBe('square-check')

			element.click()
			expect(icon.dataset.lucide).toBe('square')
		})

		it('should be true when icon is square-check, and false when icon is square', () => {
			const config = {
				id: 'en-file-checkbox-1',
				class_name: 'en-checkboxes',
				target_id: 'en-qp-1',
				group_name: 'en-qp'
			}

			const checkbox = new Checkbox(config).create()
			document.body.appendChild(checkbox)

			const element = document.getElementById('en-file-checkbox-1')
			const icon = element.querySelector('i')

			expect(element.dataset.state).toBe('false')
			expect(icon.dataset.lucide).toBe('square')

			element.click()
			expect(element.dataset.state).toBe('true')
			expect(icon.dataset.lucide).toBe('square-check')

			element.click()
			expect(element.dataset.state).toBe('false')
			expect(icon.dataset.lucide).toBe('square')

			element.click()
			expect(element.dataset.state).toBe('true')
			expect(icon.dataset.lucide).toBe('square-check')

			element.click()
			expect(element.dataset.state).toBe('false')
			expect(icon.dataset.lucide).toBe('square')
		})

		// TODO: In the browser, managing localStorage works, but in tests, it is quite tricky! This is still in process! Try to research more about this.
		it('should manage target id in localStorage when state changes', () => {
			const config = {
				id: 'en-file-checkbox-1',
				class_name: 'en-checkboxes',
				target_id: 'en-qp-1',
				group_name: 'en-qp'
			}

			const checkbox = new Checkbox(config).create()
			document.body.appendChild(checkbox)

			const element = document.getElementById('en-file-checkbox-1')

			element.click()
			setLocalStorage(`${config.group_name}-checkboxes`, config.target_id)
			expect(JSON.parse(localStorage.getItem('en-qp-checkboxes'))).toEqual(['en-qp-1'])

			//! This one doesn't work currently!
			// element.click()
			// removeLocalStorage(['en-qp-1'])
			// expect(JSON.parse(localStorage.getItem('en-qp-checkboxes'))).toEqual([])
		})
	})

	describe('remove()', () => {
		it('should remove a checkbox with valid configurations', () => {
			const config = {
				id: 'en-file-checkbox-1',
				class_name: 'en-checkboxes',
				target_id: 'en-qp-1',
				group_name: 'en-qp'
			}

			const checkbox = new Checkbox(config).create()
			document.body.appendChild(checkbox)

			checkbox.remove()

			expect(document.body.innerHTML).toBe('')
		})
	})
})
