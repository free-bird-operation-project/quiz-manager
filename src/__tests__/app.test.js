import { JSDOM } from 'jsdom'
import { App } from '../app'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.MouseEvent = window.MouseEvent
global.DocumentFragment = window.DocumentFragment

describe('App', () => {
	beforeEach(() => {
		document.body.innerHTML = ''
	})

	it('should sanitize elements correctly', () => {
		const appInstance = new App()

		expect(appInstance.sanitizedElements.every((element) => element instanceof HTMLElement)).toBe(
			true
		)
	})

	it('should create and append sanitized elements to a DocumentFragment', () => {
		const appInstance = new App()
		const fragment = appInstance.create()

		expect(fragment).toBeInstanceOf(DocumentFragment)
		expect(Array.from(fragment.childNodes).every((node) => node instanceof HTMLElement)).toBe(true)
	})
})
