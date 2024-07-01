'use strict'

import { JSDOM } from 'jsdom'
import { Container } from '@components/container'

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

	it('should append text or any external element to the container', () => {
		const config = {
			id: 'test-container',
			class_name: 'container-class'
		}

		const containerInstance = new Container(config)
		const containerElement = containerInstance.create()
		document.body.appendChild(containerElement)

		const textNode = document.createTextNode('Hello, world!')
		containerElement.appendChild(textNode)

		expect(containerElement.textContent).toBe('Hello, world!')
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
