'use strict'

import { JSDOM } from 'jsdom'
import { Button } from '@components/button'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.MouseEvent = window.MouseEvent

describe('Button', () => {
	beforeEach(() => {
		document.body.innerHTML = null
	})

	describe('create()', () => {
		describe('should create a button with a valid configuration', () => {
			it('should create a rounded-square type button', () => {
				const mock_log = jest.spyOn(console, 'log').mockImplementation(() => {})

				const config = {
					icon: 'plus',
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
				}

				const button = new Button(config)
				const button_node = button.create()
				document.body.appendChild(button_node)

				const element = document.getElementById('button-add-quiz')
				element.click()

				expect(document.body.innerHTML).not.toHaveLength(0)
				expect(button).toBeDefined()
				expect(mock_log).toHaveBeenCalledWith('It worked!')
				expect(element.id).toBe('button-add-quiz')
				expect(element.className).toBe('maker-button button rounded-square-button')
				expect(element.querySelector('[data-lucide="plus"]')).not.toBeNull()
			})

			describe('should create a slab type button', () => {
				it('should create a button with icon and text', () => {
					const mock_log = jest.spyOn(console, 'log').mockImplementation(() => {})

					const config = {
						icon: 'attachment',
						text: 'Import File',
						id: 'import-file',
						class_name: 'maker-button',
						type: 'slab',
						events: [
							{
								event_name: 'click',
								func: () => {
									console.log('It worked!')
								}
							}
						]
					}

					const button = new Button(config)
					const button_node = button.create()
					document.body.appendChild(button_node)

					const element = document.getElementById('button-import-file')
					element.click()

					expect(document.body.innerHTML).not.toHaveLength(0)
					expect(button).toBeDefined()
					expect(mock_log).toHaveBeenCalledWith('It worked!')
					expect(element.id).toBe('button-import-file')
					expect(element.className).toBe('maker-button button slab-button')
					expect(element.querySelector('[data-lucide="attachment"]')).not.toBeNull()
				})

				it('should create a button with text only', () => {
					const mock_log = jest.spyOn(console, 'log').mockImplementation(() => {})

					const config = {
						text: 'Import File',
						id: 'import-file',
						class_name: 'maker-button',
						type: 'slab',
						events: [
							{
								event_name: 'click',
								func: () => {
									console.log('It worked!')
								}
							}
						]
					}

					const button = new Button(config)
					const button_node = button.create()
					document.body.appendChild(button_node)

					const element = document.getElementById('button-import-file')
					element.click()

					expect(document.body.innerHTML).not.toHaveLength(0)
					expect(button).toBeDefined()
					expect(mock_log).toHaveBeenCalledWith('It worked!')
					expect(element.id).toBe('button-import-file')
					expect(element.className).toBe('maker-button button slab-button')
				})

				it('should not create a button without icon and text', () => {
					const mock_log = jest.spyOn(console, 'log').mockImplementation(() => {})

					const config = {
						id: 'import-file',
						class_name: 'maker-button',
						type: 'slab',
						events: [
							{
								event_name: 'click',
								func: () => {
									console.log('It worked!')
								}
							}
						]
					}

					const button = new Button(config)
					const button_node = button.create()

					expect(button_node).toBeFalsy()
				})
			})

			describe('should create a default type button', () => {
				it('should create a button with icon and text', () => {
					const mock_log = jest.spyOn(console, 'log').mockImplementation(() => {})

					const config = {
						icon: 'attachment',
						text: 'Import File',
						id: 'import-file',
						class_name: 'maker-button',
						events: [
							{
								event_name: 'click',
								func: () => {
									console.log('It worked!')
								}
							}
						]
					}

					const button = new Button(config)
					const button_node = button.create()
					document.body.appendChild(button_node)

					const element = document.getElementById('button-import-file')
					element.click()

					expect(document.body.innerHTML).not.toHaveLength(0)
					expect(button).toBeDefined()
					expect(mock_log).toHaveBeenCalledWith('It worked!')
					expect(element.id).toBe('button-import-file')
					expect(element.className).toBe('maker-button button transparent-button')
					expect(element.querySelector('[data-lucide="attachment"]')).not.toBeNull()
				})

				it('should create a button with text only', () => {
					const mock_log = jest.spyOn(console, 'log').mockImplementation(() => {})

					const config = {
						text: 'Import File',
						id: 'import-file',
						class_name: 'maker-button',
						events: [
							{
								event_name: 'click',
								func: () => {
									console.log('It worked!')
								}
							}
						]
					}

					const button = new Button(config)
					const button_node = button.create()
					document.body.appendChild(button_node)

					const element = document.getElementById('button-import-file')
					element.click()

					expect(document.body.innerHTML).not.toHaveLength(0)
					expect(button).toBeDefined()
					expect(mock_log).toHaveBeenCalledWith('It worked!')
					expect(element.id).toBe('button-import-file')
					expect(element.className).toBe('maker-button button transparent-button')
				})

				it('should not create a button without icon and text', () => {
					const mock_log = jest.spyOn(console, 'log').mockImplementation(() => {})

					const config = {
						id: 'import-file',
						class_name: 'maker-button',
						events: [
							{
								event_name: 'click',
								func: () => {
									console.log('It worked!')
								}
							}
						]
					}

					const button = new Button(config)
					const button_node = button.create()

					expect(button_node).toBeFalsy()
				})
			})
		})
	})

	describe('remove()', () => {
		it('should remove a button with a valid configuration', () => {
			const mock_log = jest.spyOn(console, 'log').mockImplementation(() => {})

			const config = {
				icon: 'plus',
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
			}

			let button = new Button(config)
			document.body.appendChild(button.create())

			const element = document.getElementById('button-add-quiz')
			element.click()

			expect(document.body.innerHTML).not.toHaveLength(0)
			expect(button).toBeDefined()
			expect(mock_log).toHaveBeenCalledWith('It worked!')
			expect(element.id).toBe('button-add-quiz')
			expect(element.className).toBe('maker-button button rounded-square-button')
			expect(element.querySelector('[data-lucide="plus"]')).not.toBeNull()

			button.remove()
			button = null

			expect(document.body.innerHTML).toHaveLength(0)
			expect(button).toBeNull()
		})

		it('should return gracefully when id is not in configuration', () => {
			const config = {}
			const button = new Button(config).remove()

			expect(button).toBeFalsy()
		})

		it('should return gracefully when id is not found in the DOM', () => {
			const config = {
				id: 'add-quiz'
			}
			const button = new Button(config).remove()

			expect(button).toBeFalsy()
		})
	})
})
