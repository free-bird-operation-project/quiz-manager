'use strict'

import { JSDOM } from 'jsdom'
import { Container } from '@components/container'
import { Button } from '@components/button'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement

describe('Container', () => {
	beforeEach(() => {
		document.body.innerHTML = ''
	})

	it('should create the container when initiated and call the create method', () => {
		const config = {
			id: 'test-container',
			class_name: 'container-class'
		}

		const containerInstance = new Container(config)
		const containerElement = containerInstance.create()

		document.body.appendChild(containerElement)
		const container = document.getElementById('test-container')

		expect(document.body.innerHTML).not.toBeNull()
		expect(containerElement).toBeDefined()
		expect(container).not.toBeNull()
		expect(container.id).toBe('test-container')
		expect(container.className).toBe('container-class')
	})

	it('should append plain text to the container', () => {
		const config = {
			id: 'test-container',
			class_name: 'container-class',
			text: 'Hello, world!'
		}

		const containerInstance = new Container(config)
		const containerElement = containerInstance.create()
		document.body.appendChild(containerElement)

		expect(containerElement.textContent).toBe('Hello, world!')
	})

	it('should append any external element to the container', () => {
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

		const button = new Button(config).create()

		const another_config = {
			id: 'test-container',
			class_name: 'container-class',
			elements: [button]
		}

		const containerInstance = new Container(another_config)
		const containerElement = containerInstance.create()
		document.body.appendChild(containerElement)

		expect(containerElement.querySelector('#button-add-quiz')).not.toBeNull()
	})

	it('should remove the container when the remove method is called', () => {
		const config = {
			id: 'test-container',
			class_name: 'container-class'
		}

		const containerInstance = new Container(config)
		const containerElement = containerInstance.create()
		document.body.appendChild(containerElement)

		containerInstance.remove()

		expect(document.getElementById('test-container')).toBeNull()
	})
})
