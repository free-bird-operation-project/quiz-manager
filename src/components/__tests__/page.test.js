'use strict'

import { JSDOM } from 'jsdom'
import { Page } from '@components/page'
import { Modal } from '@components/modal'
import { Button } from '@components/button'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement

describe('Page', () => {
	beforeEach(() => {
		document.body.innerHTML = null
	})

	describe('create()', () => {
		it('should create with valid configuration', () => {
			const config = {
				id: 'maker',
				elements: {
					header: [],
					body: []
				},
				z_index: 4
			}

			const page = new Page(config)

			document.body.appendChild(page.create())

			expect(document.body.innerHTML).not.toBeNull()
			expect(document.body.querySelector('#page-maker')).toBeTruthy()
			expect(
				document.body
					.querySelector('#page-maker')
					.getElementsByClassName('.page-header')
			).toBeTruthy()
			expect(
				document.body
					.querySelector('#page-maker')
					.getElementsByClassName('.page-body')
			).toBeTruthy()
		})

		it('should create exit button when the z-index is less than to 0 and more than 6', () => {
			const config = {
				id: 'maker',
				elements: {
					header: [],
					body: []
				},
				z_index: 6
			}

			const page = new Page(config)

			document.body.appendChild(page.create())

			const headers = Array.from(
				document.body
					.querySelector('#page-maker')
					.getElementsByClassName('page-header')
			)
			headers.forEach((header) => {
				expect(header.querySelector('#exit-button-page-6')).not.toBeNull()
			})
		})

		it('should not create exit button when the z-index is equal to 0 and less than 6', () => {
			const config = {
				id: 'maker',
				elements: {
					header: [],
					body: []
				},
				z_index: 4
			}

			const page = new Page(config)

			document.body.appendChild(page.create())

			const headers = Array.from(
				document.body
					.querySelector('#page-maker')
					.getElementsByClassName('page-header')
			)
			headers.forEach((header) => {
				expect(header.querySelector('#exit-button-page-4')).toBeNull()
			})
		})

		it('should create with elements added in config', () => {
			let button_1 = new Button({
				icon: 'badge',
				id: 'add-quiz-3',
				text: 'Badge',
				class_name: 'maker-button',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('Hi, I am working!')
						}
					}
				]
			}).create()

			let button_2 = new Button({
				icon: 'cookie',
				text: 'Cookie',
				id: 'add-quiz-4',
				class_name: 'maker-button',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('You are happy and very genius!')
						}
					}
				]
			}).create()

			let config_modal = {
				id: 'modal',
				title: 'Sample Modal',
				icon: 'heart',
				buttons: [button_1, button_2]
			}

			let button_3 = new Button({
				icon: 'anchor',
				text: 'Anchor',
				id: 'add-quiz-4',
				class_name: 'maker-button',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('Anchor')
						}
					}
				]
			})

			let button_4 = new Button({
				icon: 'grid-2x2-check',
				text: 'Grid Check',
				id: 'add-quiz-5',
				class_name: 'maker-button',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('Check')
						}
					}
				]
			})

			let modal = new Modal(config_modal)

			let config_page = {
				id: 'maker',
				elements: {
					header: [button_4],
					body: [modal, button_3]
				},
				z_index: 4
			}

			let page = new Page(config_page)
			document.body.appendChild(page.create())

			expect(document.body.innerHTML).not.toBeNull()
			expect(document.body.querySelector('#page-maker')).toBeTruthy()
			expect(
				document.body
					.querySelector('#page-maker')
					.getElementsByClassName('.page-header')
			).toBeTruthy()

			const headers = Array.from(
				document.body
					.querySelector('#page-maker')
					.getElementsByClassName('page-header')
			)
			headers.forEach((header) => {
				expect(header.querySelector('#exit-button-page-4')).toBeNull()
				expect(header.querySelector('#add-quiz-5-button')).not.toBeNull()
			})

			expect(
				document.body
					.querySelector('#page-maker')
					.getElementsByClassName('.page-body')
			).toBeTruthy()

			const bodies = Array.from(
				document.body
					.querySelector('#page-maker')
					.getElementsByClassName('page-body')
			)
			bodies.forEach((body) => {
				expect(body.querySelector('#modal')).not.toBeNull()
				expect(body.querySelector('#add-quiz-4-button')).not.toBeNull()
			})
		})
	})

	describe('remove()', () => {
		it('should remove page with valid config', () => {
			let button_1 = new Button({
				icon: 'badge',
				id: 'add-quiz-3',
				text: 'Badge',
				class_name: 'maker-button',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('Hi, I am working!')
						}
					}
				]
			}).create()

			let button_2 = new Button({
				icon: 'cookie',
				text: 'Cookie',
				id: 'add-quiz-4',
				class_name: 'maker-button',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('You are happy and very genius!')
						}
					}
				]
			}).create()

			let config_modal = {
				id: 'modal',
				title: 'Sample Modal',
				icon: 'heart',
				buttons: [button_1, button_2]
			}

			let button_3 = new Button({
				icon: 'anchor',
				text: 'Anchor',
				id: 'add-quiz-4',
				class_name: 'maker-button',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('Anchor')
						}
					}
				]
			})

			let button_4 = new Button({
				icon: 'grid-2x2-check',
				text: 'Grid Check',
				id: 'add-quiz-5',
				class_name: 'maker-button',
				events: [
					{
						event_name: 'click',
						func: () => {
							console.log('Check')
						}
					}
				]
			})

			let modal = new Modal(config_modal)

			let config_page = {
				id: 'maker',
				elements: {
					header: [button_4],
					body: [modal, button_3]
				},
				z_index: 4
			}

			let page = new Page(config_page)
			document.body.appendChild(page.create())
			page.remove()

			expect(document.body.innerHTML).toBe('')
			expect(document.body.querySelector('#page-maker')).toBeNull()
		})
	})
})
