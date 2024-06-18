'use strict'

import { JSDOM } from 'jsdom'
import { Textarea } from '@components/textarea'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement

describe('Textarea', () => {
	beforeEach(() => {
		document.body.innerHTML = null
	})

	describe('create()', () => {
		it('should create with valid config', () => {
			const config = {
				id: 'question-1',
				class_name: 'question',
				placeholder: 'Question',
				text: '',
				readonly: false
			}

			const textarea = new Textarea(config)

			document.body.appendChild(textarea.create())

			expect(document.body.innerHTML).not.toHaveLength(0)
			expect(textarea).toBeDefined()
			expect(document.querySelector('#textarea-question-1')).not.toBeNull()
			expect(document.querySelector('#textarea-question-1').placeholder).toBe('Question')
			expect(document.querySelector('#textarea-question-1').value).toBe('')
			expect(document.querySelector('#textarea-question-1').readOnly).toBe(false)
		})
	})

	describe('lock() and unlock()', () => {
		it('should lock and unlock existing textarea', () => {
			const config = {
				id: 'question-1',
				class_name: 'question',
				placeholder: 'Question',
				text: '',
				readonly: false
			}

			const textarea = new Textarea(config)

			document.body.appendChild(textarea.create())

			expect(document.querySelector('#textarea-question-1').readOnly).toBe(false)
			textarea.lock()
			expect(document.querySelector('#textarea-question-1').readOnly).toBe(true)
			textarea.unlock()
			expect(document.querySelector('#textarea-question-1').readOnly).toBe(false)
		})
	})

	describe('remove()', () => {
		it('should remove with valid config', () => {
			const config = {
				id: 'question-1',
				class_name: 'question',
				placeholder: 'Question',
				text: '',
				readonly: false
			}

			const textarea = new Textarea(config)

			document.body.appendChild(textarea.create())
			textarea.remove()

			expect(document.body.innerHTML).toBe('')
		})
	})
})
