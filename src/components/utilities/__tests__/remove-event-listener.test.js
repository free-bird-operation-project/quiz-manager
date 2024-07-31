import { JSDOM } from 'jsdom'
import { removeEventListener } from '../remove-event-listener.js'

const dom = new JSDOM('<!DOCTYPE html>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.MouseEvent = window.MouseEvent

describe('removeEventListener', () => {
	let sampleFunction

	beforeEach(() => {
		sampleFunction = (addend, augend) => {
			const sum = addend + augend
			document.body.innerHTML = sum
		}
	})

	afterEach(() => {
		document.body.innerHTML = null
	})

	it('should not call function after removing the event listener', () => {
		const button = document.createElement('div')
		const config = [
			{
				eventName: 'click',
				func: () => {
					sampleFunction(2, 3)
				}
			}
		]
		button.addEventListener(config.eventName, config.func)

		removeEventListener(button, config)
		button.click()

		expect(document.body.innerHTML).toBe('')
	})
})
