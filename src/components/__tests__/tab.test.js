'use strict'

import { JSDOM } from 'jsdom'
import { Tab } from '@components/tab'
import { Button } from '@components/button'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.MouseEvent = window.MouseEvent

describe('Tab', () => {
	beforeEach(() => {
		document.body.innerHTML = null
	})

	describe('create()', () => {
		it('should create tab with valid configuration', () => {
			const button_1 = new Button({
				icon: 'cookie',
				id: 'add-quiz',
				class_name: 'maker-button',
				type: 'rounded-square',
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
				id: 'add-quiz-2',
				class_name: 'maker-button',
				type: 'rounded-square',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('It worked again!')
						}
					}
				]
			}).create()

			const buttons = [button_1, button_2]

			const tab = new Tab({ buttons: buttons })

			document.body.appendChild(tab.create())

			expect(document.body.innerHTML).not.toBeNull()
			expect(document.body.querySelector('#tab')).toBeTruthy()
			expect(document.body.querySelector('#tab').querySelector('#tab-button-0')).toBeTruthy()
			expect(
				document.body.querySelector('#tab').querySelector('#tab-button-0').querySelector('i')
					.dataset.lucide
			).toBe('cookie')
			expect(document.body.querySelector('#tab').querySelector('#tab-button-1')).toBeTruthy()
			expect(
				document.body.querySelector('#tab').querySelector('#tab-button-1').querySelector('i')
					.dataset.lucide
			).toBe('heart')
		})

		it('should buttons function well with valid configuration', () => {
			let log_spy = jest.spyOn(console, 'log')

			const button_1 = new Button({
				icon: 'cookie',
				id: 'add-quiz',
				class_name: 'maker-button',
				type: 'rounded-square',
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
				id: 'add-quiz-2',
				class_name: 'maker-button',
				type: 'rounded-square',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('It worked again!')
						}
					}
				]
			}).create()

			const buttons = [button_1, button_2]

			const tab = new Tab({ buttons: buttons })

			document.body.appendChild(tab.create())

			const first = document.body.querySelector('#tab').querySelector('#tab-button-0')
			const second = document.body.querySelector('#tab').querySelector('#tab-button-1')

			first.click()
			expect(log_spy).toHaveBeenCalledWith('It worked!')

			second.click()
			expect(log_spy).toHaveBeenCalledWith('It worked again!')

			log_spy = null
		})
	})

	describe('remove()', () => {
		it('should remove a tab with valid configuration', () => {
			const button_1 = new Button({
				icon: 'cookie',
				id: 'add-quiz',
				class_name: 'maker-button',
				type: 'rounded-square',
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
				id: 'add-quiz-2',
				class_name: 'maker-button',
				type: 'rounded-square',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('It worked again!')
						}
					}
				]
			}).create()

			const buttons = [button_1, button_2]

			const tab = new Tab({ buttons: buttons })

			document.body.appendChild(tab.create())

			tab.remove()

			expect(document.body.innerHTML).toBe('')
			expect(document.body.querySelector('#tab')).toBeNull()
		})
	})
})
