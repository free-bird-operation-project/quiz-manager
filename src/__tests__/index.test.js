import { JSDOM } from 'jsdom'
import { initializeApp } from '../index'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.MouseEvent = window.MouseEvent

describe('initializeApp', () => {
	it('should append App to the main element when App is provided', () => {
		document.body.innerHTML = '<main></main>'
		const main = document.querySelector('main')
		const appElement = document.createElement('div')
		initializeApp(appElement)
		expect(main.contains(appElement)).toBe(true)
	})

	it('should log an error when App is null or undefined', () => {
		console.error = jest.fn()
		document.body.innerHTML = '<main></main>'
		initializeApp(null)
		expect(console.error).toHaveBeenCalledWith('Error: No app to display.')
	})

	it('should append App to the main element when App is a DocumentFragment', () => {
		const main = document.querySelector('main')
		const appFragment = document.createDocumentFragment()
		const appElement = document.createElement('div')
		appFragment.appendChild(appElement)
		initializeApp(appFragment)
		expect(main.contains(appElement)).toBe(true)
	})
})
