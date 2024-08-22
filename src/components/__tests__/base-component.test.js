import { JSDOM } from 'jsdom'
import { BaseComponent } from '../base-component'

const dom = new JSDOM('<!DOCTYPE html><div id="test-element"></div>')
global.window = dom.window
global.document = window.document
global.HTMLElement = window.HTMLElement
global.HTMLParagraphElement = window.HTMLParagraphElement

describe('BaseComponent', () => {
	let utility

	beforeEach(() => {
		utility = new BaseComponent()
	})

	describe('_createContainer', () => {
		it('should create a container element with specified tag and attributes', () => {
			const attributes = {
				id: 'container-div',
				class: 'container',
				style: 'color: green;'
			}
			const container = utility._createContainer('div', attributes)

			expect(container).toBeInstanceOf(HTMLElement)
			expect(container.tagName).toBe('DIV')
			expect(container.getAttribute('id')).toBe('container-div')
			expect(container.getAttribute('class')).toBe('container')
			expect(container.getAttribute('style')).toBe('color: green;')
		})

		it('should return null if tagName is not a string', () => {
			const utility = new BaseComponent({})
			const attributes = { id: 'test-div' }
			const container = utility._createContainer(123, attributes)

			expect(container).toBeNull()
		})

		it('should return null if attributes is not an object', () => {
			const utility = new BaseComponent({})
			const container = utility._createContainer('div', 'invalid-attributes')

			expect(container).toBeNull()
		})

		it('should return null if both tagName and attributes are invalid', () => {
			const utility = new BaseComponent({})
			const container = utility._createContainer(null, null)

			expect(container).toBeNull()
		})
	})

	describe('_createIcon', () => {
		it('should create an icon element with a specified icon name', () => {
			const utility = new BaseComponent({})
			const iconName = 'star'
			const iconElement = utility._createIcon(iconName)

			expect(iconElement).toBeInstanceOf(HTMLElement)
			expect(iconElement.tagName).toBe('I')
			expect(iconElement.getAttribute('data-lucide')).toBe(iconName)
		})

		it('should return null if iconName is not a string', () => {
			const utility = new BaseComponent({})
			const iconElement = utility._createIcon(123)

			expect(iconElement).toBeNull()
		})

		it('should return null if iconName is an empty string', () => {
			const utility = new BaseComponent({})
			const iconElement = utility._createIcon('')

			expect(iconElement).toBeNull()
		})
	})

	describe('_createText', () => {
		it('should create a text element with specified text', () => {
			const utility = new BaseComponent({})
			const text = 'Hello, world!'
			const textElement = utility._createText(text)

			expect(textElement).toBeInstanceOf(HTMLParagraphElement)
			expect(textElement.textContent).toBe(text)
		})

		it('should return null if text is not a string', () => {
			const utility = new BaseComponent({})
			const textElement = utility._createText(123)

			expect(textElement).toBeNull()
		})

		it('should return null if text is an empty string', () => {
			const utility = new BaseComponent({})
			const textElement = utility._createText('')

			expect(textElement).toBeNull()
		})
	})

	describe('_removeById', () => {
		it('should remove an element from the DOM by its ID', () => {
			const utility = new BaseComponent({})
			const id = 'test-element'
			const element = document.getElementById(id)

			expect(element).not.toBeNull()

			const result = utility._removeById(id)

			expect(result).toBe(true)
			expect(document.getElementById(id)).toBeNull()
		})

		it('should return false if the element with the given ID does not exist', () => {
			const utility = new BaseComponent({})
			const invalidId = 'non-existent-id'

			const result = utility._removeById(invalidId)

			expect(result).toBe(false)
		})

		it('should return false if the ID is not a string', () => {
			const utility = new BaseComponent({})
			const result = utility._removeById(123)

			expect(result).toBe(false)
		})
	})
})
