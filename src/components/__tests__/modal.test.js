'use strict'

import { JSDOM } from 'jsdom'
import { Modal } from '@components/modal'
import { Button } from '@components/button'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.MouseEvent = window.MouseEvent

describe('Modal', () => {
	beforeEach(() => {
		document.body.innerHTML = null
	})

	describe('create()', () => {
		it('should create modal with valid configuration', () => {
			const button_1 = new Button({
				icon: 'copy',
				id: 'duplicate-quiz',
				text: 'Duplicate',
				class_name: 'maker-button',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('It worked!')
						}
					}
				]
			}).create()

			const button_2 = new Button({
				icon: 'heart',
				text: 'Favorite',
				id: 'add-quiz-2',
				class_name: 'maker-button',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('It worked again!')
						}
					}
				]
			}).create()

			const config = {
				id: 'modal',
				title: 'Sample Modal',
				icon: 'heart',
				buttons: [button_1, button_2]
			}

			const modal = new Modal(config)

			document.body.appendChild(modal.create())

			expect(document.body.innerHTML).not.toBeNull()
			expect(document.body.querySelector('#modal')).toBeTruthy()
			expect(document.body.querySelector('#modal').querySelector('#modal-button-0')).toBeTruthy()
			expect(
				document.body.querySelector('#modal').querySelector('#modal-button-0').querySelector('i')
					.dataset.lucide
			).toBe('copy')
			expect(document.body.querySelector('#modal').querySelector('#modal-button-1')).toBeTruthy()
			expect(
				document.body.querySelector('#modal').querySelector('#modal-button-1').querySelector('i')
					.dataset.lucide
			).toBe('heart')
		})

		it('should buttons function well with valid configuration', () => {
			let log_spy = jest.spyOn(console, 'log')

			const button_1 = new Button({
				icon: 'copy',
				id: 'duplicate-quiz',
				text: 'Duplicate',
				class_name: 'maker-button',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('It worked!')
						}
					}
				]
			}).create()

			const button_2 = new Button({
				icon: 'heart',
				text: 'Favorite',
				id: 'add-quiz-2',
				class_name: 'maker-button',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('It worked again!')
						}
					}
				]
			}).create()

			const config = {
				id: 'modal',
				title: 'Sample Modal',
				icon: 'heart',
				buttons: [button_1, button_2]
			}

			const modal = new Modal(config)

			document.body.appendChild(modal.create())

			const first = document.body.querySelector('#modal').querySelector('#modal-button-0')
			const second = document.body.querySelector('#modal').querySelector('#modal-button-1')

			first.click()
			expect(log_spy).toHaveBeenCalledWith('It worked!')

			second.click()
			expect(log_spy).toHaveBeenCalledWith('It worked again!')

			log_spy = null
		})
	})

	describe('remove()', () => {
		it('should remove a modal with valid configuration', () => {
			const button_1 = new Button({
				icon: 'copy',
				id: 'duplicate-quiz',
				text: 'Duplicate',
				class_name: 'maker-button',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('It worked!')
						}
					}
				]
			}).create()

			const button_2 = new Button({
				icon: 'heart',
				text: 'Favorite',
				id: 'add-quiz-2',
				class_name: 'maker-button',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('It worked again!')
						}
					}
				]
			}).create()

			const config = {
				id: 'modal',
				title: 'Sample Modal',
				icon: 'heart',
				buttons: [button_1, button_2]
			}

			const modal = new Modal(config)

			document.body.appendChild(modal.create())

			modal.remove()

			expect(document.body.innerHTML).toBe('')
			expect(document.body.querySelector('#modal')).toBeNull()
		})
	})
})
